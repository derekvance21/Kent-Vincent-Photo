import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const iconSize = 1.5 // em

const Nav = styled.nav`
  position: fixed;
  z-index: 100;
  top: 0px;
  padding: 0.2rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`

const navMenuOpened = css`` // background-color could go here to only toggle background-color on menu click

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const MenuIcon = styled.span`
  color: white;
  font-size: ${iconSize}em;
`

const MenuButton = styled.a`
  margin-right: 0.5em;
`

const NavMenu = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0.2rem;
  text-align: left;
`

const menuLink = css`
  width: calc(50% - 0.5em);
  font-size: 1.5rem;
  margin: 0.5em 0.5em 0.5em 0;
  color: white;
  text-decoration: none;
  border-bottom: solid white 1px;
`

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false)

  const handleMenuClick = () => setMenuOpened(prevValue => !prevValue)

  return (
    <Nav css={menuOpened && navMenuOpened}>
      <NavTop>
        <Link to="/">
          <MenuIcon>
            <i className="fas fa-home"></i>
          </MenuIcon>
        </Link>
        <MenuButton role="button" onClick={handleMenuClick}>
          <MenuIcon>
            <i className={"fas " + (menuOpened ? "fa-times" : "fa-bars")}></i>
          </MenuIcon>
        </MenuButton>
      </NavTop>
      {menuOpened && (
        <NavMenu id="navbarMenu">
          <Link css={menuLink} to="/albums">
            Albums
          </Link>
          <Link css={menuLink} to="/map">
            Map
          </Link>
          <Link css={menuLink} to="/about">
            About
          </Link>
          <Link css={menuLink} to="/contact">
            Contact
          </Link>
          <Link css={menuLink} to="/cart">
            Contact
          </Link>
          <a css={menuLink} href="https://www.instagram.com">
            <i className="fab fa-instagram"></i>
          </a>
        </NavMenu>
      )}
    </Nav>
  )
}

/* <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </a>

    <a
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Home</a>

      <a class="navbar-item">Documentation</a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">More</a>

        <div class="navbar-dropdown">
          <a class="navbar-item">About</a>
          <a class="navbar-item">Jobs</a>
          <a class="navbar-item">Contact</a>
          <hr class="navbar-divider"></hr>
          <a class="navbar-item">Report an issue</a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </div>
    </div>
  </div>
</nav> */
