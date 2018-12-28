// npm require
const gulp = require('gulp')
const extend = require('extend')
const fs = require('fs')
const util = require('util')
const promisify = util.promisify
const path = require('path')
const del = require('del')
const minimist = require('minimist')
const pump = require('pump')
//const request = require('request')
const pug = require('pug')
//const mkdirp = require('mkdirp')
const glog = require('fancy-log')
const colors = require('colors')
const readyaml = require('js-yaml').safeLoad

const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)
$ = require('gulp-load-plugins')()

// const exec = require('child_process').exec
// const join = path.join
// const moment = require('moment')
// const numeral = require('numeral')
// const inquirer = require('inquirer')

// promisify

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

// arg
const argv = minimist(process.argv.slice(2))

// debug
const DEBUG = !!( argv._.indexOf('debug') > -1 || argv.debug )

function existFile(file) {
    try {
        fs.statSync(file)
        return true
    } catch(e) {
        if(e.code === 'ENOENT') return false
    }
}

function loadyaml(filepath){
    return readyaml(fs.readFileSync(filepath))
}

// グローバル気味変数
let package = require('./package.json')
let messages = loadyaml('./.config/messages.yml')
let site = extend(true,
    loadyaml('./.config/default.yml'),
    loadyaml('./.config/images.yml')
)

if(argv._.some(e => e == 'local-server')) site = extend(this,site,readyaml(fs.readFileSync(`./.config/debug-override.yml`)))


const keys = (() => {
    if(existFile('./.config/keys.yml')){
        try {
            return loadyaml('./.config/keys.yml')
        } catch(e) {
            glog(`'./.config/keys.yml' is wrong.`)
            throw Error(e)
        }
    }/* else if (A_KEY_YOU_WANT_TO_READ_FROM_ENV in provess.env) {
        return {
            service: {
                key: process.env.A_KEY_YOU_WANT_TO_READ_FROM_ENV,
            }
        }
    }*/ else { return {} }
})()

let temp_dir = 'dist/cache/' // 末尾のスラッシュ必要

const urlPrefix = `${site.url.scheme}://${site.url.host}${site.url.path}`
glog(`Site url is '${urlPrefix}'`)

let src = {
   'everypug': ['theme/pug/**/*.pug','./.temp/**/*.pug'],
   'json': ['config/**/*.json'],
   'js': ['theme/js/**/*.js'],
   'styl_all': ['theme/styl/**/*.styl'],
   'static': ['theme/static/**'],
   'files': ['files/**/*'],
   'filesPrebuilt': ['filesPrebuilt/**/*'],
   'everystyl': ['theme/styl/**/*.styl'],
   'pages': path.join(site.pages_src.path, site.pages_src.src)
}

let dests = {
    'root': './dist/docs',
    'everything': './dist/docs/**',
    'info': './dist/docs/info.json'
}

let manifest = {},
    pages = [],
    base,
    pugfilters

gulp.task('register', async cb => {
    const rf = promisify(fs.readFile)
    manifest = {}
    pages = []
    ytthumbs = []
    pugfilters = require('./pugfilters.js')
    manifest = require('./scripts/builder/registerer/manifest')(site)
    pages = await require('./scripts/builder/registerer/pages')(site, src, urlPrefix)
    const theme_pug = {
            script: await rf('theme/pug/includes/_script.pug', {encoding: 'utf8'}),
            mixin: await rf('theme/pug/includes/_mixins.pug', {encoding: 'utf8'})
        }
    const base_p = await require('./scripts/builder/registerer/base')(site, keys, temp_dir)

    base = extend(true,
        base_p, 
        {
            update: (new Date()),
            site,
            keys,
            package,
            pages,
            manifest,
            messages,
            require,
            theme_pug,
            urlPrefix,
            DEBUG
        }
    )

    cb()
})

gulp.task('config', () => {
    let resultObj = { options: '' }
    resultObj.timestamp = (new Date()).toJSON()
    resultObj = extend(true,resultObj, {'pages' : pages})
    require('mkdirp').sync(path.parse(dests.info).dir)
    return writeFile( dests.info, JSON.stringify( resultObj ))
    .then(
        () => { glog(colors.green(`✔ info.json`)) },
        (err) => { glog(colors.red(`✖ info.json`)); glog(err) }
    )
})

const cssDestpath = dests.root + '/assets/styles'
const cssExtrprefix = 'extracted-'

gulp.task('css', (cb) => {

    pump([
        gulp.src('theme/styl/main.sass'),
        $.sass( { sourceMap: true, outputStyle: 'compressed' } ),
        $.postcss([
            require('postcss-sorting')(),
            require('autoprefixer')({ browsers: 'defaults' }),
            require('postcss-extract-media-query')({
                output: {
                    path: cssDestpath,
                    name: `${cssExtrprefix}[query].[ext]`
                }
            })
        ]),
        $.rename('common.css'),
        gulp.dest(cssDestpath)
    ], async (e) => {
        if(e) glog(colors.red("Error(css)\n" + e))
        else glog(colors.green(`✔ assets/style/common.css`))
        cb()
    })
})

let extractedCsses

gulp.task('register-csses', (cb) => {
    const glob = promisify(require('glob'))
    glob(`${argv._.some(v => v == 'pages') ? './docs/assets/styles' : cssDestpath}/${cssExtrprefix}*.css`)
    .then(async files => {
        const contents = await Promise.all(files.map((name, i, arr) => readFile(name, 'utf-8')))
        extractedCsses = files.map((name, i, arr) => {
            const res = /@media (.*?){/i.exec(contents[i])
            return {
                name: path.parse(name).name,
                mquery: res ? res[1] : null
            }
        })
    })
    .then(cb)
})

gulp.task('js', (cb) => {
    const webpackStream = require('webpack-stream')
    const webpack = require('webpack')
    const wpackconf = {
        entry: ['./theme/js/main.ts'],
        output: {
            filename: "main.js",
            publicPath: `${site.url.path}/assets/scripts/`
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: ["node_modules"]
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader" }
            ]
        },
        mode: 'production',
    }

    webpackStream(wpackconf, webpack)
    .pipe(gulp.dest(dests.root + '/assets/scripts'))
    .on('end',() => {
        glog(colors.green(`✔ assets/main.js`))
        cb()
    })
    .on('error', (err) => {
        cb(err)
    })
})

function searchSidebar(pathe){
    let searchin
    if(pathe.dir == "") searchin = `${pathe.dir}sidebar.pug`
    else searchin = `${pathe.dir}/sidebar.pug`
    if(existFile(searchin)){
        return searchin
    } else {
        // const uppath = path.parse(pathe.dir)
        // searchSidebar(uppath)
        return "pages/sidebar.pug"
    }
}

async function toamp(htm, base){
    const sizeOf = require('image-size')
    let $ = require('cheerio').load(htm, {decodeEntities: false})
    const promises = []
    $('img[src]').each(function(i, el){
        promises.push(new Promise(async (resolve, reject) => {
            let src    = $(el).attr('src')
            let alt    = $(el).attr('alt')
            let title  = $(el).attr('title')
            let id     = $(el).attr('id')
            let width  = $(el).attr('width')
            let height = $(el).attr('height')
            if( ( width === undefined || height === undefined ) && src.startsWith(`${urlPrefix}/files/`) ){
                const dims = sizeOf( '.' + src.slice(urlPrefix.length) )
                width = dims.width
                height = dims.height
                src = base.site.url.path + "/" + src
            } else if ( ( width === undefined || height === undefined ) && ( src.startsWith('http') || src.startsWith('//') ) ){
                const url = require('url').parse(src)
                const filename = `${url.pathname.slice(1).replace(/\//g,'-')}`.slice(-36)
                const temppath = `${temp_dir}amp/${url.hostname}/`
                require('mkdirp').sync(temppath)
                const v = await require('./scripts/downloadTemp')(filename, src, temppath, true)
                glog(v)
                if (!v || !existFile(`${temppath}${filename}.${v.ext}`)) {
                    glog( `${messages.amp.invalid_imageUrl}:\n${src}` )
                    return resolve()
                }
                const dims = sizeOf( `${temppath}${filename}.${v.ext}` )
                width = dims.width
                height = dims.height
            } else {
                glog( `${messages.amp.invalid_imageUrl}:\n${src}` )
                return resolve()
            }
            $('img[src]').eq(i).after(`<amp-img src="${src}" alt="${alt}" title="${title}" id="${id}" width="${width}" height="${height}" layout="responsive"></amp-image>`)
            return resolve()
        }))
    })
    if(promises.length > 0) await Promise.all(promises)
    $('img').remove()
    return $('body').html()
}

gulp.task('pug', async () => {
    const streams = []
    const sidebarcache = {}

    for (const page of pages) {
        const puglocals = extend(true,
            {
                page,
                filters: pugfilters,
                extractedCsses
            }, base)
        let layout = page.attributes.layout
        let template = '', amptemplate = ''
        if(existFile(`theme/pug/templates/${layout}.pug`)) template += `theme/pug/templates/${layout}.pug`
        else if(existFile(`theme/pug/templates/${site.default.template}.pug`)) template += `theme/pug/templates/${site.default.template}.pug`
        else throw Error('default.pugが見つかりませんでした。')

        if(site.sidebar){
            const sidebarpath = searchSidebar(page.meta.src)
            if(!sidebarcache[sidebarpath]) sidebarcache[sidebarpath] = await readFile(sidebarpath, 'utf-8')
            let sidebar_html = pug.render(`${puglocals.theme_pug.script}\n${puglocals.theme_pug.mixin}\n${sidebarcache[sidebarpath]}`, puglocals)
            puglocals.sidebar_html = sidebar_html
        }

        puglocals.main_html = page.main_html = require('./scripts/make_html')(page, puglocals, urlPrefix)
        puglocals.headings = require('./scripts/regheadings')(page.main_html)

        streams.push(
            new Promise((res, rej) => {
                gulp.src(template)
                    .pipe($.pug({ locals: puglocals }))
                    .pipe($.rename(`${page.meta.permalink}index.html`))
                    .pipe(gulp.dest( dests.root ))
                    .on('end',() => {
                        // glog(colors.green(`✔ ${page.meta.permalink}`))
                        res()
                    })
                    .on('error', (err) => {
                        glog(colors.red(`✖ ${page.meta.permalink}`))
                        rej(err)
                    })
            })
        )
        /*
         *                            AMP処理部
         *                                                                  */

        if(page.attributes.amp){
            if(existFile(`theme/pug/templates/amp_${layout}.pug`)) amptemplate += `theme/pug/templates/amp_${layout}.pug`
            else if(existFile(`theme/pug/templates/amp_${site.default.template}.pug`)) amptemplate += `theme/pug/templates/amp_${site.default.template}.pug`
            else throw Error('amp_default.pugが見つかりませんでした。')
            streams.push(
                new Promise(async (res, rej) => {
                    const newoptions = extend(true,
                        { isAmp: true, main_html: await toamp(puglocals.main_html, base) },
                        puglocals
                    )
                    gulp.src(amptemplate)
                        .pipe($.pug({ locals: newoptions }))
                        .pipe($.rename(`${page.meta.permalink}amp.html`))
                        .pipe(gulp.dest( dests.root ))
                        .on('end',() => {
                            // glog(colors.green(`✔ ${page.meta.permalink}amp.html`))
                            res()
                        })
                        .on('error', (err) => {
                            glog(colors.red(`✖ ${page.meta.permalink} (amp)`))
                            rej(err)
                        })
                })
            )
        }
    }

    await Promise.all(streams)
    glog(colors.green(`✔ all html produced`))
    return void(0)
})

gulp.task('fa-css', (cb) => {
    pump([
        gulp.src('node_modules/@fortawesome/fontawesome-svg-core/styles.css'),
        $.cleanCss(),
        $.rename('fontawesome.min.css'),
        gulp.dest(dests.root + '/assets')
    ], (e) => {
        if(e) glog(colors.red("Error(fa-css)\n" + e))
        else glog(colors.green(`✔ assets/style.min.css`))
        cb()
    })
})

gulp.task('copy-docs', (cb) => {
    pump([
        gulp.src('dist/docs/**/*', {dot: true}),
        gulp.dest('./docs')
    ], cb)
})
gulp.task('copy-theme-static', (cb) => {
    pump([
        gulp.src('theme/static/**/*', {dot: true}),
        gulp.dest(dests.root)
    ], cb)
})
gulp.task('copy-prebuildFiles', (cb) => {
    pump([
        gulp.src('dist/files/**/*', {dot: true}),
        gulp.dest(dests.root + '/files')
    ], cb)
})
gulp.task('copy-files', (cb) => {
    pump([
        gulp.src(src.files, {dot: true}),
        gulp.dest(dests.root + '/files')
    ], cb)
})
gulp.task('copy-f404', (cb) => {
    pump([
        gulp.src('dist/docs/404/index.html', {dot: true}),
        $.rename('404.html'),
        gulp.dest('./docs')
    ], cb)
})

const images_allFalse = {
    optipng: false,
    pngquant: false,
    zopflipng: false,
    jpegRecompress: false,
    mozjpeg: false,
    guetzli: false,
    gifsicle: false,
    svgo: false
}
function images_base(){
    return site.images.files.all.image ? extend(true, images_allFalse, site.images.files.all.image) : images_allFalse
}

const gm_autoOrient = $.gm((gmfile) => { return gmfile.autoOrient() }, { imageMagick: site.imageMagick })

gulp.task('image-prebuildFiles', () => {
    const raster = 'files/**/*.{png,jpg,jpeg}'
    const vector = 'files/**/*.{gif,svg}'
    const sizes = site.images.files.sizes
    const streamsrc = gulp.src(raster).pipe(gm_autoOrient)
    const streams = []
    for(i = 0; i < sizes.length; i++){
        streams.push(
            new Promise((res, rej) => {
                streamsrc
                .pipe($.imageResize(sizes[i].resize ? extend(true, {imageMagick: site.imageMagick}, sizes[i].resize) : {}))
                .pipe($.image(sizes[i].image ? extend(true, images_base(), sizes[i].image) : images_allFalse))
                .pipe($.rename(sizes[i].rename || {}))
                .pipe(gulp.dest('dist/files'))
                .on('end', res)
                .on('error', rej)
            })
        )
    }
    streams.push(
        new Promise((res, rej) => {
            gulp.src(vector)
            .pipe($.image(extend(true, images_base(), {
                "gifsicle": true,
                "svgo": true
            })))
            .pipe(gulp.dest('dist/files'))
            .on('end', res)
            .on('error', rej)
        })
    )
    return Promise.all(streams)
})

gulp.task('image', () => {
    if (!argv.i) new Error('ファイル/フォルダ名が指定されていません。 -i <path>を付けて指定してください。')
    const parsed = path.parse(argv.i)
    if (parsed.length <= 0) new Error('指定されたパスにファイルは見つかりませんでした。')
    const sizes = site.images.files.sizes
    const streams = []
    const date = new Date()
    let gifsvg, others
    const dirname = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}`
    if(parsed.ext == "") {
        glog(`image will be saved like as "files/imports/${dirname}/filename.ext"`)
        gifsvg = gulp.src(argv.i + '/**/*.{gif,svg}')
        others = gulp.src(argv.i + '/**/*.{png,jpg,jpeg}')
    } else if(parsed.ext == ".gif" || parsed.ext == ".svg") {
        glog(`image will be saved like as "files/imports/${dirname}/${parsed.name}${parsed.ext}"`)
        gifsvg = gulp.src(argv.i)
    } else {
        glog(`image will be saved like as "files/imports/${dirname}/${parsed.name}${parsed.ext}"`)
        others = gulp.src(argv.i).pipe(gm_autoOrient)
    }
    if(gifsvg){
        streams.push(
            new Promise((res, rej) => {
                gifsvg
                .pipe($.image(extend(true, images_base(), {
                    "gifsicle": true,
                    "svgo": true
                })))
                .pipe($.rename({dirname: dirname} || {}))
                .pipe(gulp.dest('dist/files/images/imports'))
                .on('end', res)
                .on('error', rej)
            })
        )
        streams.push(
            new Promise((res, rej) => {
                gifsvg
                .pipe($.rename({dirname: dirname} || {}))
                .pipe(gulp.dest('files/images/imports'))
                .on('end', res)
                .on('error', rej)
            })
        )
    }
    if(others){
        for(i = 0; i < sizes.length; i++){
            streams.push(
                new Promise((res, rej) => {
                    others
                    .pipe($.imageResize(sizes[i].resize ? extend(true, {imageMagick: site.imageMagick}, sizes[i].resize) : {}))
                    .pipe($.image(sizes[i].image ? extend(true, images_base(), sizes[i].image) : images_allFalse))
                    .pipe($.rename(sizes[i].rename || {}))
                    .pipe($.rename({dirname: dirname} || {}))
                    .pipe(gulp.dest('dist/files/images/imports'))
                    .on('end', res)
                    .on('error', rej)
                })
            )
        }
        streams.push(
            new Promise((res, rej) => {
                others
                .pipe($.rename({dirname: dirname} || {}))
                .pipe(gulp.dest('files/images/imports'))
                .on('end', res)
                .on('error', rej)
            })
        )
    }

    return Promise.all(streams)
})

gulp.task('clean-docs', (cb) => { del(['docs/**/*', '!docs/.git'], {dot: true}).then(cb()) } )
gulp.task('clean-dist-docs', (cb) => { del('dist/docs/**/*', {dot: true}).then(cb()) } )
gulp.task('clean-dist-files', (cb) => { del('dist/files/**/*', {dot: true}).then(cb()) } )

gulp.task('make-sw', (cb) => {
    if(!site.sw) { cb(); return void(0) }
    const destName = "service_worker"
    let res = ''
        res =
`/* workbox ${base.update.toJSON()} */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.routing.registerRoute(
    /.*\.(?:${site.sw})/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'assets-cache',
    })
);
`
        const offline = pages.some((e) => e.meta.permalink == '/offline/')
        if(offline){
            res +=
`workbox.precaching.precacheAndRoute([
    {
        url: '/offline/',
        revision: '${base.update.getTime()}',
    }
]);
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
        .catch(function() {
            return caches.match('/offline/');
        })
    );
});
`
        }/*
        if(site.ga){
                res +=
`workbox.googleAnalytics.initialize({
    parameterOverrides: {
        cd1: 'offline',
    },
});
`
        }*/
        fs.writeFile(`${dests.root}/${destName}.js`, res, () => {
            glog(colors.green(`✔ ${destName}.js`))
            cb()
        })
})

gulp.task('make-manifest', (cb) => {
    return writeFile( `dist/docs/manifest.json`, JSON.stringify(manifest))
    .then(
        () => { glog(colors.green(`✔ manifest.json`)) },
        (err) => { glog(colors.red(`✖ manifest.json`)); glog(err) }
    )
})

gulp.task('make-rss', (cb) => {
    if(site.rss){
        const feed = require('./scripts/builder/registerer/rss')(base, pages, site.rss.root, site.rss.template)
        return Promise.all([
            writeFile( `dist/docs/feed.rss`, feed.rss2())
            .then(
                () => { glog(colors.green(`✔ feed.rss`)) },
                (err) => { glog(colors.red(`✖ feed.rss`)); glog(err) }
            ),
            writeFile( `dist/docs/feed.json`, feed.json1())
            .then(
                () => { glog(colors.green(`✔ feed.json`)) },
                (err) => { glog(colors.red(`✖ feed.json`)); glog(err) }
            ),
            writeFile( `dist/docs/feed.atom`, feed.atom1())
            .then(
                () => { glog(colors.green(`✔ feed.atom`)) },
                (err) => { glog(colors.red(`✖ feed.atom`)); glog(err) }
            )
        ])
    } else {
        return cb()
    }
})

const browserconfigXml = () => `<?xml version='1.0' encoding='utf-8'?>
    <browserconfig>
      <msapplication>
        <tile>
          <square70x70logo src='${site.url.path}${site.mstiles.s70x70.path}'/>
          <square144x144logo src='${site.url.path}${site.mstiles.s144x144.path}'/>
          <square150x150logo src='${site.url.path}${site.mstiles.s150x150.path}'/>
          <square310x310logo src='${site.url.path}${site.mstiles.s310x310.path}'/>
          <wide310x150logo src='${site.url.path}${site.mstiles.w310x150.path}'/>
          <TileColor>${site.theme_color.secondary}</TileColor>
        </tile>
      </msapplication>
    </browserconfig>`

gulp.task('make-browserconfig', (cb) => {
    fs.writeFile( `dist/docs/browserconfig.xml`, browserconfigXml, () => {
        glog(colors.green(`✔ browserconfig.xml`)); cb()
    })
})

function wait4(cb, sec){
    let interval = null
    process.stdout.write(colors.green(` ${sec} ██████    \r`))
    function waiti(){
        sec--
        if( sec < 0 && interval != null ){
            process.stdout.write(`\r`)
            cb()
            clearInterval(interval)
        }
        else if ( sec == 0 ) process.stdout.write(colors.red(`\r ${sec}              \r`))
        else if ( sec == 1 ) process.stdout.write(colors.red(`\r ${sec}  █            \r`))
        else if ( sec == 2 ) process.stdout.write(colors.red(`\r ${sec}  ██          \r`))
        else if ( sec == 3 ) process.stdout.write(colors.red(`\r ${sec}  ███        \r`))
        else if ( sec == 4 ) process.stdout.write(colors.yellow(`\r ${sec}  ████      \r`))
        else if ( sec == 5 ) process.stdout.write(colors.yellow(`\r ${sec}  █████    \r`))
        else process.stdout.write(colors.green(`\r ${sec}  ██████    `))
    }
    interval = setInterval(waiti, 1000)
}

gulp.task('wait-5sec', (cb) => {
    wait4(cb, 5)
})

gulp.task('wait-10sec', (cb) => {
    wait4(cb, 10)
})

gulp.task('last',
    gulp.series(
        'clean-docs',
        'copy-f404',
        'copy-docs',
        'clean-dist-docs',
        (cb) => { cb() }
    )
)

gulp.task('copy-publish',
    gulp.series(
        'copy-files',
        'copy-prebuildFiles',
        'copy-theme-static',
        (cb) => { cb() }
    )
)
gulp.task('make-subfiles',
    gulp.series(
        gulp.parallel(
            'make-manifest',
            'make-rss',
            'make-browserconfig'
        ),
        (cb) => { cb() }
    )
)

gulp.task('core',
    gulp.series(
        gulp.parallel(
            'config',
            gulp.series('css', 'register-csses', 'pug'),
            'js',
            'fa-css'
        ),
        gulp.parallel('copy-publish', 'make-subfiles'),
        'make-sw', 'last',
        (cb) => { cb() }
    )
)

gulp.task('default',
    gulp.series(
        'register',
        'core',
        (cb) => { cb() }
    )
)

gulp.task('pages',
    gulp.series(
        'register',
        gulp.parallel('config', 'register-csses'), 
        'pug',
        gulp.parallel('copy-prebuildFiles', 'make-subfiles'),
        'copy-f404',
        'copy-docs',
        'clean-dist-docs',
        (cb) => { cb() }
    )
)

gulp.task('prebuild-files',
    gulp.series(
        'clean-dist-files',
        'image-prebuildFiles',
        (cb) => { cb() } 
    )
)

gulp.task('core-with-pf',
    gulp.series(
        'css', 'register-csses',
        gulp.parallel('js', 'fa-css', 'pug', 'prebuild-files'),
        gulp.parallel('copy-publish', 'make-subfiles'),
        'make-sw', 'last',
        (cb) => { cb() }
    )
)

gulp.task('travis_ci',
    gulp.series(
        'register',
        'prebuild-files',
        'default',
        (cb) => { cb() }
    )
)

gulp.task('watcher',
    gulp.series(
        'wait-5sec', 'register', 'config',
        (cb) => { cb() } 
    )
)

gulp.task('watch', (cb) => {
    gulp.watch(['theme/**/*', `!${temp_dir}**/*`, 'pages/**/*', './.config/**/*', './scripts/**/*'], gulp.series('watcher', 'server',(cb)=>{cb()}))
    gulp.watch(['files/**/*', './.config/**/*'], gulp.series('watcher',(cb)=>{cb()}))
})

gulp.task('connect', () => {
    $.connect.server({
        port: site.url.host.split(':')[1],
        root: 'docs',
        livereload: true
    })
})

gulp.task('server',
    gulp.series(
        'register',
        'core',
        (cb) => { cb() } 
    )
)

gulp.task('local-server',
    gulp.series(
        'register',
        'core',
        gulp.parallel('connect', 'watch'),
        (cb) => { cb() } 
    )
)