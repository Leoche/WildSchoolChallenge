import Scroll from './Scroll.js'
class Menu {
  constructor (menu) {
    this.moveable = document.createElement('div')
    this.moveable.classList = "moveable"
    this.menu = menu
    this.menu.parentElement.append(this.moveable)
    this.active = null
    this.offset = -64
    this.sections = {}
    this.resetActive()
    this.setupSections()
    this.testSections()
    this.setupEvents()
  }

  setupEvents () {
    Array.from(this.menu.children).forEach(li => {
      let a = li.firstChild
      a.addEventListener('click', evt => {
        evt.preventDefault()
        Scroll.to(document.querySelector(a.hash), 500, this.offset)
      })
    })
    window.addEventListener('scroll', () => this.testSections())
    window.addEventListener('resize', () => {
      this.setupSections()
      this.testSections()
    })
  }

  setupSections () {
    Array.from(this.menu.children).forEach(li => {
      let a = li.firstChild
      this.sections[a.hash.replace('#', '')] = document.querySelector(a.hash).offsetTop
    })
  }
  testSections () {
    Object.entries(this.sections).forEach((section) => {
      if (window.pageYOffset - this.offset >= section[1]) {
        this.active = section[0]
        this.setActive()
      }
    })
  }

  setActive () {
    this.resetActive()
    let a = document.querySelector("a[href='#" + this.active + "']")
    a.classList.add('active')
    this.moveable.style.left = a.getBoundingClientRect().left
    this.moveable.style.width = a.getBoundingClientRect().width
  }
  resetActive () {
    Array.from(this.menu.children).forEach(li => li.firstChild.classList.remove('active'))
  }
}
export default Menu