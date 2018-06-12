import Menu from './Menu.js'
window.requestAnimFrame = (
  () => window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || (callback => window.setTimeout(callback, 1000 / 60))
)();
window.onload = () => {
  new Menu(document.querySelector('nav>ul'))
}