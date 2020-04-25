/* eslint-disable no-useless-escape */
// npm require
const gulp = require("gulp")
const extend = require("extend")
const fs = require("fs")
const { promisify } = require("util")
const path = require("path")
const del = require("del")
const pump = require("pump")
const pug = require("pug")
const glog = require("fancy-log")
const glob = require("glob")
const colors = require("colors")
const mkdirp = require("mkdirp")
const webpackStream = require("webpack-stream")
const webpack = require("webpack")
const { SitemapStream, streamToPromise } = require("sitemap")

const postcssSorting = require("postcss-sorting")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

const { dom, library } = require("@fortawesome/fontawesome-svg-core")

library.add(
  require("@fortawesome/free-solid-svg-icons").fas,
  require("@fortawesome/free-regular-svg-icons").far,
  require("@fortawesome/free-brands-svg-icons").fab
)

const $ = require("gulp-load-plugins")()

const makeHtml = require("./scripts/makeHtml")
const regheadings = require("./scripts/regheadings")
const toamp = require("./scripts/builder/toamp")
const loadyaml = require("./scripts/builder/loadyaml")
const makeRss = require("./scripts/builder/registerer/rss")

// promisify
const writeFile = async (pathe, ...args) => {
  await mkdirp(path.dirname(pathe))
  return promisify(fs.writeFile)(pathe, ...args)
}
const readFile = promisify(fs.readFile)

// arg
const argv = require("./scripts/argv")

// debug
const DEBUG = !!(argv._.indexOf("debug") > -1 || argv.debug)

function existFile(file) {
  try {
    fs.statSync(file)
    return true
  } catch (e) {
    if (e.code === "ENOENT") return false
    return null
  }
}

// グローバル気味変数
const packageJson = require("./package.json")

const messages = loadyaml("./.config/messages.yml")
const site = require("./scripts/site")

const keys = (() => {
  if (existFile("./.config/keys.yml")) {
    try {
      return loadyaml("./.config/keys.yml")
    } catch (e) {
      glog("./.config/keys.yml is wrong.")
      throw Error(e)
    }
  // eslint-disable-next-line brace-style
  } /* else if (A_KEY_YOU_WANT_TO_READ_FROM_ENV in provess.env) {
        return {
            service: {
                key: process.env.A_KEY_YOU_WANT_TO_READ_FROM_ENV,
            }
        }
    } */ else { return {} }
})()

const tempDir = "dist/cache/" // 末尾のスラッシュ必要

const urlPrefix = `${site.url.scheme}://${site.url.host}${site.url.path}`
glog(`Site url is "${urlPrefix}"`)

const src = {
  everypug: ["theme/pug/**/*.pug", "./.temp/**/*.pug"],
  json: ["config/**/*.json"],
  js: ["theme/js/**/*.js"],
  styl_all: ["theme/styl/**/*.styl"],
  static: ["theme/static/**"],
  files: ["files/**/*"],
  filesPrebuilt: ["filesPrebuilt/**/*"],
  everystyl: ["theme/styl/**/*.styl"],
  pages: path.join(site.pages_src.path, site.pages_src.src)
}

const dests = {
  root: "./dist/docs",
  everything: "./dist/docs/**",
  info: "./dist/docs/info.json"
}

let manifest = {}
let pages = []
let base
let pugfilters

const getBase = require("./scripts/builder/registerer/base")
const getPages = require("./scripts/builder/registerer/pages")
const getManifest = require("./scripts/builder/registerer/manifest")

gulp.task("register", async cb => {
  const rf = promisify(fs.readFile)
  manifest = {}
  pages = []
  // eslint-disable-next-line global-require
  pugfilters = require("./pugfilters.js")
  manifest = getManifest(site)
  const [npages, nscript, nmixin, baseP] = await Promise.all([
    getPages(site, src, urlPrefix),
    rf("theme/pug/includes/_script.pug", { encoding: "utf8" }),
    rf("theme/pug/includes/_mixins.pug", { encoding: "utf8" }),
    getBase(site, keys, tempDir)
  ])
  pages = npages
  base = extend(
    true,
    baseP,
    {
      update: (new Date()),
      site,
      keys,
      package: packageJson,
      pages,
      manifest,
      messages,
      require,
      themePug: {
        script: nscript,
        mixin: nmixin
      },
      urlPrefix,
      DEBUG
    }
  )

  cb()
})

gulp.task("config", async () => {
  let resultObj = { options: "" }
  resultObj.timestamp = (new Date()).toJSON()
  resultObj = extend(true, resultObj, { pages })
  await mkdirp(path.parse(dests.info).dir)
  return writeFile(dests.info, JSON.stringify(resultObj))
    .then(
      () => { glog(colors.green("✔ info.json")) },
      err => { glog(colors.red("✖ info.json")); glog(err) }
    )
})

const cssDestpath = `${dests.root}/assets/styles`

gulp.task("css", cb => {
  pump([
    gulp.src("theme/styl/main.sass"),
    $.sass({ sourceMap: true, outputStyle: "compressed" }),
    $.header(dom.css()),
    $.postcss([
      postcssSorting(),
      autoprefixer(),
      cssnano()
    ]),
    $.rename("main.css"),
    gulp.dest(cssDestpath)
  ], async e => {
    if (e) glog(colors.red(`Error(css)\n${e}`))
    else glog(colors.green("✔ assets/styles/main.css"))
    cb()
  })
})

gulp.task("js", cb => {
  const wpackconf = {
    entry: {
      main: "./theme/js/main.ts",
      "blog-index": "./theme/js/blog-index.ts",
      sw: "./theme/js/sw.ts"
    },
    output: {
      filename: "[name].js",
      publicPath: `${site.url.path}/assets/scripts/`
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".sass", ".scss", ".css"],
      modules: ["node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.s[ac]ss$/]
          }
        }
      ]
    },
    mode: "production"
  }

  webpackStream(wpackconf, webpack)
    .pipe(gulp.dest(`${dests.root}/assets/scripts`))
    .on("end", () => {
      glog(colors.green("✔ scripts"))
      cb()
    })
    .on("error", err => {
      cb(err)
    })
})

function searchSidebar(pathe) {
  let searchin
  if (pathe.dir === "") searchin = "pages/sidebar.pug"
  else searchin = `${pathe.dir}/sidebar.pug`
  if (existFile(searchin) || searchin === "pages/sidebar.pug") {
    return searchin
  }
  const uppath = path.parse(pathe.dir)
  searchSidebar(uppath)
  return null
}

gulp.task("pug", async () => {
  const streams = []
  const puglocalses = []
  const sidebarPaths = []
  const sidebarReadPromises = []

  const compilers = Object.fromEntries(
    (await promisify(glob)("theme/pug/templates/*.pug"))
      .map(e => [path.parse(e).name, pug.compileFile(e)])
  )

  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i]
    const puglocals = { page }

    if (site.sidebar) {
      const sidebarpath = (searchSidebar(page.meta.src)) || "pages/sidebar.pug"
      puglocals.sidebarpath = sidebarpath
      if (!sidebarPaths.some(e => e === sidebarpath)) {
        sidebarPaths.push(sidebarpath)
        sidebarReadPromises.push(
          readFile(sidebarpath, "utf-8")
            .catch(e => {
              glog(colors.red(`Sidebar Reading Failed at ${sidebarpath}`))
              throw Error(e)
            })
        )
      }
    }
    puglocalses.push(puglocals)
  }

  const sidebarReadsArr = await Promise.all(sidebarReadPromises)
  const sidebarReads = {}
  if (site.sidebar && sidebarPaths.length > 0) {
    for (let n = 0; n < sidebarReadsArr.length; n += 1) {
      sidebarReads[sidebarPaths[n]] = sidebarReadsArr[n]
    }
  }

  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i]
    const puglocals = puglocalses[i]
    const renderBase = { ...puglocals, filters: pugfilters, ...base }

    if (site.sidebar && sidebarPaths.length > 0) {
      puglocals.sidebarHtml = pug.render(`${base.themePug.script}\n${base.themePug.mixin}\n${sidebarReads[puglocals.sidebarpath]}`, renderBase)
    }
    const mainHtml = page.canonical ? `This page has been moved to <a href="${page.canonical}">${page.canonical}</a>` : makeHtml(page, renderBase, urlPrefix)

    const { layout } = page.attributes

    puglocals.mainHtml = mainHtml
    puglocals.headings = regheadings(puglocals.mainHtml)

    const html = (compilers[layout] || compilers.default)({
      filters: pugfilters,
      ...base,
      ...puglocals,
      globals: Object.keys(base).concat(Object.keys(puglocals))
    })

    const index = page.meta.dirs[page.meta.dirs.length - 1] === "" ? "index" : ""

    streams.push(writeFile(`${dests.root}${page.meta.permalink}${index}.html`, html, "utf8"))

    /*
     *                            AMP処理部
     *                                                                  */

    if (page.attributes.amp) {
      puglocals.mainHtml = toamp(puglocals.mainHtml, urlPrefix)
      puglocals.isAmp = true
      const ahtml = (compilers[`amp_${layout}`] || compilers.amp_default)({
        filters: pugfilters,
        ...base,
        ...puglocals,
        globals: Object.keys(base).concat(Object.keys(puglocals))
      })
      streams.push(writeFile(`${dests.root}${page.meta.permalink}${index}.amp.html`, ahtml, "utf8"))
    }
  }

  await Promise.all(streams)
  glog(colors.green("✔ all html produced"))
  return null
})

gulp.task("copy-docs", cb => {
  pump([
    gulp.src("dist/docs/**/*", { dot: true }),
    gulp.dest("./docs")
  ], cb)
})
gulp.task("copy-theme-static", cb => {
  pump([
    gulp.src("theme/static/**/*", { dot: true }),
    gulp.dest(dests.root)
  ], cb)
})
gulp.task("copy-prebuildFiles", cb => {
  pump([
    gulp.src("dist/files/**/*", { dot: true }),
    gulp.dest(`${dests.root}/files`)
  ], cb)
})
gulp.task("copy-files", cb => {
  pump([
    gulp.src(src.files, { dot: true }),
    gulp.dest(`${dests.root}/files`)
  ], cb)
})

if (!Array.isArray) {
  Array.isArray = arg => Object.prototype.toString.call(arg) === "[object Array]"
}

const imagesAllFalse = {
  optipng: false,
  pngquant: false,
  zopflipng: false,
  jpegRecompress: false,
  mozjpeg: false,
  guetzli: false,
  gifsicle: false,
  svgo: false
}
function imagesBase() {
  return site.images.files.all.image ? extend(
    true,
    imagesAllFalse,
    site.images.files.all.image
  ) : imagesAllFalse
}

gulp.task("clean-docs", cb => { del(["docs/**/*", "!docs/.git"], { dot: true }).then(cb()) })
gulp.task("clean-dist-docs", cb => { del("dist/docs/**/*", { dot: true }).then(cb()) })
gulp.task("clean-dist-files", cb => { del("dist/files/**/*", { dot: true }).then(cb()) })

gulp.task("make-sw", cb => {
  if (!site.sw) {
    cb()
    return null
  }
  const destName = "service_worker"
  const offline = pages.some(e => e.meta.permalink === "/offline")
  let res = ""
  res = `/* workbox ${base.update.toJSON()} */
`

  res += `importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /.*\\.(?:${site.sw})/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "assets-cache",
  })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\\.com/,
  new workbox.strategies.StaleWhileRevalidate(),
);

workbox.routing.registerRoute(
  /^https:\\/\\/cdn\\.jsdelivr\\.net/,
  new workbox.strategies.CacheFirst({
    cacheName: 'jsdelivr',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 160
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\\.(?:png|jpg|jpeg|webp|svg|gif)\\?v=${site.image_compressing_strategy_version}$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 160
      })
    ]
  })
);
`

  if (offline) {
    res += `workbox.precaching.precacheAndRoute([
    {
        url: "/offline",
        revision: "${base.update.getTime()}",
    }
]);

self.addEventListener("fetch", function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          return response || fetch(event.request);
      })
      .catch(function() {
          return caches.match("/offline");
      })
  );
});
`
  }

  fs.writeFile(`${dests.root}/${destName}.js`, res, () => {
    glog(colors.green(`✔ ${destName}.js`))
    cb()
  })
  return null
})

gulp.task("make-manifest", () => writeFile("dist/docs/manifest.json", JSON.stringify(manifest))
  .then(
    () => { glog(colors.green("✔ manifest.json")) },
    err => { glog(colors.red("✖ manifest.json")); glog(err) }
  ))

gulp.task("make-rss", cb => {
  if (site.rss) {
    const feed = makeRss(base, pages, site.rss.root, site.rss.template)
    return Promise.all([
      writeFile("dist/docs/feed.rss", feed.rss2())
        .then(
          () => { glog(colors.green("✔ feed.rss")) },
          err => { glog(colors.red("✖ feed.rss")); glog(err) }
        ),
      writeFile("dist/docs/feed.json", feed.json1())
        .then(
          () => { glog(colors.green("✔ feed.json")) },
          err => { glog(colors.red("✖ feed.json")); glog(err) }
        ),
      writeFile("dist/docs/feed.atom", feed.atom1())
        .then(
          () => { glog(colors.green("✔ feed.atom")) },
          err => { glog(colors.red("✖ feed.atom")); glog(err) }
        )
    ])
  }
  return cb()
})

const browserconfigXml = () => `<?xml version="1.0" encoding="utf-8"?>
    <browserconfig>
      <msapplication>
        <tile>
          <square70x70logo src="${site.url.path}${site.mstiles.s70x70.path}"/>
          <square144x144logo src="${site.url.path}${site.mstiles.s144x144.path}"/>
          <square150x150logo src="${site.url.path}${site.mstiles.s150x150.path}"/>
          <square310x310logo src="${site.url.path}${site.mstiles.s310x310.path}"/>
          <wide310x150logo src="${site.url.path}${site.mstiles.w310x150.path}"/>
          <TileColor>${site.theme_color.secondary}</TileColor>
        </tile>
      </msapplication>
    </browserconfig>`

gulp.task("make-browserconfig", cb => {
  fs.writeFile("dist/docs/browserconfig.xml", browserconfigXml, () => {
    glog(colors.green("✔ browserconfig.xml")); cb()
  })
})

gulp.task("make-sitemap", cb => {
  const urls = pages.map(page => ({
    url: page.meta.permalink
  }))

  const stream = new SitemapStream({
    hostname: urlPrefix,
    urls
  })

  stream.end()

  const pr = await streamToPromise(stream)

  fs.writeFile("dist/docs/sitemap.xml", pr, () => {
    glog(colors.green("✔ sitemap.xml"))
    cb()
  })
})

gulp.task("make-image_compressing_strategy_version_file", cb => {
  fs.writeFile("dist/image_compressing_strategy_version", site.image_compressing_strategy_version, () => {
    glog(colors.green("✔ image_compressing_strategy_version")); cb()
  })
})

/*
  IMAGE IMPORTING & CONVERTING TASKS
*/

gulp.task("image-prebuildFiles", () => {
  const raster = "files/**/*.{png,jpg,jpeg}"
  const gif = "files/**/*.gif"
  const svg = "files/**/*.svg"
  const streams = []
  streams.push(
    new Promise((res, rej) => {
      gulp.src(raster)
        .pipe($.responsive({
          "**": site.images.files.responsive
        }, site.images.files.all.responsive))
        .pipe($.image(imagesBase()))
        .pipe(gulp.dest("dist/files"))
        .on("end", res)
        .on("error", rej)
    })
  )
  streams.push(
    new Promise((res, rej) => {
      gulp.src(gif)
        .pipe($.image(extend(true, imagesBase(), {
          gifsicle: true
        })))
        .pipe(gulp.dest("dist/files"))
        .on("end", res)
        .on("error", rej)
    })
  )
  streams.push(
    new Promise((res, rej) => {
      gulp.src(svg)
        .pipe($.svgmin())
        .pipe(gulp.dest("dist/files"))
        .on("end", res)
        .on("error", rej)
    })
  )
  return Promise.all(streams)
})

gulp.task("prebuild-files",
  gulp.series(
    "clean-dist-files",
    "image-prebuildFiles",
    "make-image_compressing_strategy_version_file",
    cb => { cb() }
  ))

gulp.task("image", () => {
  if (!argv.i) throw Error("ファイル/フォルダ名が指定されていません。 -i <path>を付けて指定してください。")
  const parsed = path.parse(argv.i)
  if (parsed.length <= 0) throw Error("指定されたパスにファイルは見つかりませんでした。")
  const streams = []
  const date = new Date()
  let gif; let svg; let others
  const dirname = `${date.getFullYear()}/${(`0${date.getMonth() + 1}`).slice(-2)}`
  if (parsed.ext === "") {
    glog(`image will be saved like as "files/images/imports/${dirname}/filename.ext"`)
    gif = gulp.src(`${argv.i}/**/*.gif`)
    svg = gulp.src(`${argv.i}/**/*.svg`)
    others = gulp.src(`${argv.i}/**/*.{png,jpg,jpeg}`)
  } else if (parsed.ext === ".svg") {
    glog(`image will be saved like as "files/images/imports/${dirname}/${parsed.name}${parsed.ext}"`)
    svg = gulp.src(argv.i)
  } else if (parsed.ext === ".gif") {
    glog(`image will be saved like as "files/images/imports/${dirname}/${parsed.name}${parsed.ext}"`)
    gif = gulp.src(argv.i)
  } else {
    glog(`image will be saved like as "files/images/imports/${dirname}/${parsed.name}${parsed.ext}"`)
    others = gulp.src(argv.i)
  }
  if (gif) {
    streams.push(
      new Promise((res, rej) => {
        gif
          .pipe($.image(extend(true, imagesBase(), {
            gifsicle: true
          })))
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("dist/files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
    streams.push(
      new Promise((res, rej) => {
        gif
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
  }
  if (svg) {
    streams.push(
      new Promise((res, rej) => {
        svg
          .pipe($.svgmin())
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("dist/files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
    streams.push(
      new Promise((res, rej) => {
        svg
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
  }
  if (others) {
    streams.push(
      new Promise((res, rej) => {
        others
          .pipe($.responsive({
            "**": site.images.files.responsive
          }, site.images.files.all.responsive))
          .pipe($.image(imagesBase()))
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("dist/files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
    streams.push(
      new Promise((res, rej) => {
        others
          .pipe($.rename({ dirname } || {}))
          .pipe(gulp.dest("files/images/imports"))
          .on("end", res)
          .on("error", rej)
      })
    )
  }

  return Promise.all(streams)
})

function wait4(cb, psec) {
  let sec = psec
  let interval = null
  process.stdout.write(colors.green(` ${sec} ██████    \r`))
  function waiti() {
    sec -= 1
    if (sec < 0 && interval != null) {
      process.stdout.write("\r")
      cb()
      clearInterval(interval)
    } else if (sec === 0) process.stdout.write(colors.red(`\r ${sec}              \r`))
    else if (sec === 1) process.stdout.write(colors.red(`\r ${sec}  █            \r`))
    else if (sec === 2) process.stdout.write(colors.red(`\r ${sec}  ██          \r`))
    else if (sec === 3) process.stdout.write(colors.red(`\r ${sec}  ███        \r`))
    else if (sec === 4) process.stdout.write(colors.yellow(`\r ${sec}  ████      \r`))
    else if (sec === 5) process.stdout.write(colors.yellow(`\r ${sec}  █████    \r`))
    else process.stdout.write(colors.green(`\r ${sec}  ██████    `))
  }
  interval = setInterval(waiti, 1000)
}

gulp.task("wait-5sec", cb => {
  wait4(cb, 5)
})

gulp.task("wait-10sec", cb => {
  wait4(cb, 10)
})

gulp.task("last",
  gulp.series(
    "clean-docs",
    "copy-docs",
    "clean-dist-docs",
    cb => { cb() }
  ))

gulp.task("copy-publish",
  gulp.series(
    "copy-files",
    "copy-prebuildFiles",
    "copy-theme-static",
    cb => { cb() }
  ))
gulp.task("make-subfiles",
  gulp.series(
    gulp.parallel(
      "make-manifest",
      "make-rss",
      "make-browserconfig",
      "make-sitemap"
    ),
    cb => { cb() }
  ))

gulp.task("core",
  gulp.series(
    gulp.parallel(
      "config",
      "css",
      "pug",
      "js"
    ),
    gulp.parallel("copy-publish", "make-subfiles"),
    "make-sw", "last",
    cb => { cb() }
  ))

gulp.task("default",
  gulp.series(
    "register",
    "core",
    cb => { cb() }
  ))

gulp.task("pages",
  gulp.series(
    "register",
    gulp.parallel("config", "pug"),
    gulp.parallel("copy-prebuildFiles", "make-subfiles"),
    "copy-docs",
    "clean-dist-docs",
    cb => { cb() }
  ))

gulp.task("prebuild-files",
  gulp.series(
    "clean-dist-files",
    "image-prebuildFiles",
    cb => { cb() }
  ))

gulp.task("watcher",
  gulp.series(
    "wait-5sec", "register", "config",
    cb => { cb() }
  ))

gulp.task("watch", () => {
  gulp.watch(["theme/**/*", `!${tempDir}**/*`, "pages/**/*", "./.config/**/*", "./scripts/**/*"], gulp.series("watcher", "server", cb => { cb() }))
  gulp.watch(["files/**/*", "./.config/**/*"], gulp.series("watcher", cb => { cb() }))
})

gulp.task("connect", () => {
  $.connect.server({
    port: site.url.host.split(":")[1],
    root: "docs",
    livereload: true
  })
})

gulp.task("server",
  gulp.series(
    "register",
    "core",
    cb => { cb() }
  ))

gulp.task("local-server",
  gulp.series(
    "register",
    "core",
    gulp.parallel("connect", "watch"),
    cb => { cb() }
  ))

gulp.task("all",
  gulp.series(
    "prebuild-files",
    "default",
    cb => { cb() }
  ))
