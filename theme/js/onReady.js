export default f => {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", f) : f()
}