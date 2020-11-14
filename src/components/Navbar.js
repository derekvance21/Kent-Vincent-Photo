import React, { useState } from "react"
import { Link } from "gatsby"

// const MenuLink = ({ to }) => (
//   <div className="navbar__menu--item">
//     <Link className="navbar__menu--link" to={`/${to}`}>
//       {to[0].toUpperCase() + to.slice(1).toLowerCase()}
//     </Link>
//   </div>
// )

const MenuLink = ({ to }) => (
  <Link
    className="nav-menu__item nav-menu__link"
    to={`/${to === "home" ? "" : to}`}
  >
    {to[0].toUpperCase() + to.slice(1).toLowerCase()}
  </Link>
)

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false)

  const handleMenuClick = () => setMenuOpened(prevValue => !prevValue)

  return (
    // <nav id="navbar" className={"navbar " + (menuOpened && "navbar--opened")}>
    //   <div className="navbar__top">
    //     <i
    //       tabIndex={0}
    //       aria-label="Open navigation menu"
    //       role="button"
    //       className={
    //         "navbar__top--icon fas " + (menuOpened ? "fa-times" : "fa-bars")
    //       }
    //       onKeyDown={handleMenuClick}
    //       onClick={handleMenuClick}
    //     ></i>
    //     <Link to="/">
    //       <i className="navbar__top--icon fas fa-home"></i>
    //     </Link>
    //   </div>
    //   {menuOpened && (
    //     <div id="navbarMenu" className="navbar__menu">
    //       <MenuLink to="albums" />
    //       <MenuLink to="about" />
    //     </div>
    //   )}
    // </nav>
    <nav id="navbar" className="nav-menu">
      <MenuLink to="home" />
      <MenuLink to="albums" />
      <MenuLink to="about" />
    </nav>
  )
}
