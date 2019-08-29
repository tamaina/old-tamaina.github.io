export const pjaxinit = async () => {
  const { Pjax } = await import("pjax-api")
  return new Pjax({
    areas: [
      "#main, #breadcrumb, #mainnav, #sidebar",
      "#grid",
      "body"
    ],
    update: {
      css: false,
      head: "meta",
      script: false
    }
  })
}
