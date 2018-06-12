import Scroll from './Scroll.js'
class Menu {
  constructor (menu) {
    this.initLogo()
    this.moveable = document.createElement('div')
    this.moveable.classList = "moveable"
    this.menu = menu
    this.menu.parentElement.append(this.moveable)
    this.active = null
    this.offset = -64
    this.sections = {}
    this.resetActive()
    this.initSections()
    this.initEvents()

    this.testSections()
  }

  initLogo () {
    const logo = document.querySelector('h1')
    logo.innerHTML = logo.innerHTML.split(" ")[0] + '<span>' + logo.innerHTML.split(" ")[1] + '</span>'
  }
  initSections () {
    Array.from(this.menu.children).forEach(li => {
      const a = li.firstChild
      this.sections[a.hash.replace('#', '')] = document.querySelector(a.hash).offsetTop
    })
  }
  initEvents () {
    Array.from(this.menu.children).forEach(li => {
      const a = li.firstChild
      a.addEventListener('click', evt => {
        evt.preventDefault()
        Scroll.to(document.querySelector(a.hash), 500, this.offset)
      })
    })
    window.addEventListener('scroll', () => {
      this.testSections()
      this.parallaxHeader()
    })
    window.addEventListener('resize', () => {
      this.initEvents()
      this.testSections()
    })
  }

  testSections () {
    this.active = null
    Object.entries(this.sections).forEach((section) => {
      if (window.pageYOffset - this.offset >= section[1]) {
        this.active = section[0]
      }
    })
    if (this.active === null) {
      this.resetActive()
      this.moveable.style.left = 0
      this.moveable.style.width = 0
      this.disableSticky()
    } else {
      this.setActive()
      this.enableSticky()
    }
  }

  setActive () {
    this.resetActive()
    const a = document.querySelector("a[href='#" + this.active + "']")
    a.classList.add('active')
    this.moveable.style.left = a.getBoundingClientRect().left - this.menu.parentElement.getBoundingClientRect().left
    this.moveable.style.width = a.getBoundingClientRect().width
  }
  resetActive () {
    Array.from(this.menu.children).forEach(li => li.firstChild.classList.remove('active'))
  }
  enableSticky () {
    document.querySelector('header').classList.add('sticky')
  }
  disableSticky () {
    document.querySelector('header').classList.remove('sticky')
  }
}
export default Menu