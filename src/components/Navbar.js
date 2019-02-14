import React from 'react'
import Image from 'gatsby-image'
import Transition from '../components/Transition'
import TransitionLink from '../components/TransitionLink'
import { TransitionConsumer } from '../components/TransitionContext'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }

  componentDidMount() {
    let path = window.location.pathname.split('/')

    // Initialise the position of the highlight el to
    // position of the link currently active.
    let activeLink =
      document.querySelector(`.nav-menu-item[data-to*=\"${path[1]}\"]`) ||
      document.querySelector('.nav-menu-item')
    let highlight = document.querySelector('#navMenu .highlight')
    highlight.style.transform = `translateY(${
      activeLink.getBoundingClientRect().y
    }px)`

    // Initialise the position of the secondary highlight el
    // to position of the sub link currently active.
    if (path.length > 1) {
      let activeSubLink = document.querySelector(
        `.nav-submenu-item[data-to*=\"${path[2]}\"]`
      )
      let subHighlight = document.querySelector('#navSubMenu .highlight')
      if (subHighlight && activeSubLink) {
        subHighlight.style.transform = `translateY(${
          activeSubLink.getBoundingClientRect().y
        }px)`
      }
    }
  }

  handleEnter(to) {
    this._fadeInMenu()
  }

  handleExit(to) {
    let path = to.split('/')
    this._highlightActiveLink(path[1])

    if (path[1] === 'about' && path.length > 2) {
      // this._highlightActiveSubLink(path[2])
    }
  }

  toggleNav() {
    let { transition, setTransition } = this.props
    setTransition({ navOpen: !transition.navOpen })
  }

  hideMenu(path) {
    let subMenuDom = document.getElementById('navSubMenu')
    let prevPath = window.history.state ? window.history.state.prevPath : null
    if (prevPath && !this._isSubPath(prevPath, path)) {
      // subMenuDom.classList.remove('animate')
      // subMenuDom.classList.remove('show')
      // subMenuDom.classList.add('hide')
    }
  }

  showMenu(path) {
    let subMenuDom = document.getElementById('navSubMenu')
    let prevPath = window.history.state ? window.history.state.prevPath : null
    if (prevPath && this._isSubPath(prevPath, path)) {
      // Persist - do not animate menu if rendering a sub path.
      subMenuDom.classList.remove('animate')
    }
    subMenuDom.classList.add('show')
    subMenuDom.classList.remove('hide')
  }

  _isSubPath(a, b) {
    const SUB_ROOT = 1
    if (!a || !b) return false

    let pathA = a.split('/')
    let pathB = b.split('/')
    return pathA[SUB_ROOT] === pathB[SUB_ROOT]
  }

  _highlightActiveLink(path) {
    // Translate the highlight el to location of clicked link.
    let highlight = document.querySelector('#navMenu .highlight')
    let activeLink =
      document.querySelector(`.nav-menu-item[data-to*=\"${path}\"]`) ||
      document.querySelector('.nav-menu-item')
    highlight.classList.add('active')
    highlight.style.transform = `translateY(${
      activeLink.getBoundingClientRect().y
    }px)`
  }

  _highlightActiveSubLink(path) {
    let highlight = document.querySelector('#navSubMenu .highlight')
    let activeLink = document.querySelector(
      `.nav-submenu-item[data-to*=\"${path}\"]`
    )
    highlight.classList.add('active')
    highlight.style.transform = `translateY(${
      activeLink.getBoundingClientRect().y
    }px)`
  }

  _renderSubMenu() {
    if (typeof window === 'undefined') {
      return null
    }

    let path = window.location.pathname
    if (path.split('/')[1] !== 'work') {
      return (
        <ol id="navSubMenu" className="nav-submenu animate">
          <img className="nav-submenu-item" src="/img/avatar_thumbnail.jpg" width="200px"/>
        </ol>
      )
    }
    return (
      <ol id="navSubMenu" className="nav-submenu animate">
        <span className="highlight" />
        <TransitionLink
          className="nav-submenu-item"
          to="/work/cycle-recycle-club"
          onClick={this.toggleNav}
        >
          Cycle Recycle Club
        </TransitionLink>
        <TransitionLink 
          className="nav-submenu-item" 
          to="/work/musings"
          onClick={this.toggleNav}
        >
          Musings
        </TransitionLink>
        <TransitionLink
          className="nav-submenu-item"
          to="/work/cycle-recycle-club"
          onClick={this.toggleNav}
        >
          Lazy Squirrel
        </TransitionLink>
      </ol>
    )
  }

  render() {
    let { navOpen } = this.props.transition
    let { className } = this.props
    return (
      <nav
        className={`${className} navbar ${navOpen ? 'is-open' : ''}`}
        role="navigation"
        aria-label="main-navigation"
      >
        {/* Hamburger menu */}
        <div
          className="navbar-burger burger"
          data-target="navMenu"
          onClick={this.toggleNav}
        >
          <span className="open bottom" />
          <span className="open top" />
          <span className="close top" />
          <span className="close bottom" />
        </div>
        <div className="container">
          <ol id="navMenu" className="nav-menu">
            <Transition onExit={this.handleExit}>
              <span className="highlight" />
            </Transition>
            <TransitionLink className="nav-menu-item" to="/me" onClick={this.toggleNav}>
              Me
            </TransitionLink>
            <TransitionLink className="nav-menu-item" to="/work" onClick={this.toggleNav}>
              Work
            </TransitionLink>
          </ol>
          <Transition onEnter={this.showMenu} onExit={this.hideMenu}>
            {this._renderSubMenu()}
          </Transition>
        </div>
      </nav>
    )
  }
}

/* Wrap our navbar in a consumer and pass down path context as props. */
const ConnectedNavbar = props => {
  return (
    <TransitionConsumer>
      {({ transition, setTransition }) => (
        <Navbar
          {...props}
          transition={transition}
          setTransition={setTransition}
        />
      )}
    </TransitionConsumer>
  )
}

export default ConnectedNavbar
