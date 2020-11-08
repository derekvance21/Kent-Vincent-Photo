import React, { useState } from "react"
import { Link } from "gatsby"

const MenuLink = ({ to }) => (
  <div className="navbar__menu--item">
    <Link className="navbar__menu--link" to={`/${to}`}>
      {to[0].toUpperCase() + to.slice(1).toLowerCase()}
    </Link>
  </div>
)

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false)

  const handleMenuClick = () => setMenuOpened(prevValue => !prevValue)

  return (
    <nav id="navbar" className={"navbar " + (menuOpened && "navbar--opened")}>
      <div className="slideUp navbar__top">
        <Link to="/">
          <i className="navbar__top--icon fas fa-home"></i>
        </Link>
        <i
          tabIndex={0}
          aria-label="Open navigation menu"
          role="button"
          className={
            "navbar__top--icon fas " + (menuOpened ? "fa-times" : "fa-bars")
          }
          onKeyDown={handleMenuClick}
          onClick={handleMenuClick}
        ></i>
      </div>
      {menuOpened && (
        <div id="navbarMenu" className="navbar__menu">
          <MenuLink to="albums" />
          <MenuLink to="about" />
          <MenuLink to="cart" />
          <div className="navbar__menu--item">
            <a className="navbar__menu--link" href="https://www.instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
