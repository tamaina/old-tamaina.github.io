const { Feed } = require("feed")

module.exports = (base, pages, rootdir, theme) => {
  pages.sort((a, b) => {
    if ((a.meta.mtime || a.meta.birthtime) < (b.meta.mtime || b.meta.birthtime)) {
      return 1
    }
    return -1
  })

  const qpages = pages.filter(
    e => e.meta.permalink.indexOf(rootdir) === 0
      && e.attributes.layout === theme
      && e.attributes.draft !== true
      && e.attributes.published === true
  )

  const feed = new Feed({
    title: base.site.name,
    link: base.urlPrefix,
    description: base.site.description,
    favicon: `${base.urlPrefix}/favicon.ico`,
    copyright: `© ${base.site.author}`,
    feedLinks: {
      json: `${base.urlPrefix}/feed.json`,
      atom: `${base.urlPrefix}/feed.atom`
    }
  })

  for (let i = 0; i < qpages.length; i += 1) {
    const page = qpages[i]
    const author = page.attributes.author ? [{
      name: page.attributes.author.name,
      url: page.attributes.author.name
    }] : []
    let image = ""
    if (page.meta.thumbnail) image = `${base.urlPrefix}${page.meta.thumbnail.dir}/${page.meta.thumbnail.base}`
    else if (base.site.site_card_path) image = `${base.urlPrefix}${base.site.site_card_path}`
    else image = `${base.urlPrefix}/favicon.ico`
    feed.addItem({
      title: page.attributes.title,
      id: `${base.urlPrefix}${page.meta.permalink}`,
      link: `${base.urlPrefix}${page.meta.permalink}?rel=rss`,
      date: new Date(page.meta.mtime),
      description: page.attributes.description,
      content: page.mainHtml,
      author,
      image
    })
  }
  return feed
}
