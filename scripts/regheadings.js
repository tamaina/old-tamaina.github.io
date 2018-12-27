module.exports = htm => {
    let heading_html, headings = []
    const reg_heading = /<h([1-6])(.*?)>([^]*?)<\/h(\1)>/gi
    while((heading_html = reg_heading.exec(htm)) !== null){
        let heading = {},
            idmatch = []
        idmatch = heading_html[2].match(/id=(["'])(.*?)(\1)/)
        classmatch = heading_html[2].match(/class=(["'])(.*?)(\1)/)
        if(idmatch == null)
            heading.id = null
        else
            heading.id = idmatch[2]
        heading.html     = heading_html[0]
        heading.number   = heading_html[1]
        heading.attr     = heading_html[2]
        heading.text     = heading_html[3]
        if ( classmatch == null || classmatch[2].indexOf('noindex') == -1 ) headings.push(heading)
    }
    return headings
}
