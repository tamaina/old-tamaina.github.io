module.exports = (site) => {
    let icons = []
    for (let i = 0 ; i < site.icons.length ; i++) {
        let icon = site.icons[i]
        icon.src = site.url.path + icon.path
        icons.push(icon)
    }
    let start_url
    if (site.manifest.start_url) start_url = site.manifest.start_url.startsWith('/') ? site.url.path + site.manifest.start_url : site.manifest.start_url
    else start_url = site.url.path + '/'
    return require('extend')(true, {
        'name': site.name,
        'short_name': site.short_name,
        icons,
        start_url,
        'theme_color': site.theme_color.primary,
        'background_color': site.theme_color.secondary
    }, site.manifest)
}