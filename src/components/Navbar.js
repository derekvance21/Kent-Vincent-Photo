import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const iconSize = 1.5 // em

const Nav = styled.nav`
  position: fixed;
  z-index: 100;
  top: 0px;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--content-max-width);
`

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const MenuIcon = styled.span`
  color: white;
  font-size: ${iconSize}em;
  cursor: pointer;
  text-align: center;
`

const NavMenu = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const menuLink = css`
  width: calc(50% - 0.5em);
  font-size: 1.5rem;
  margin: 0.5em 0.5em 0.5em 0;
  color: white;
  text-decoration: none;
  border-bottom: solid white 1px;
`

const navMenuOpened = css`
  background-color: var(--text-overlay-background);
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
        <MenuIcon onClick={handleMenuClick}>
          <i className={"fas " + (menuOpened ? "fa-times" : "fa-bars")}></i>
        </MenuIcon>
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
            Cart
          </Link>
          <a css={menuLink} href="https://www.instagram.com">
            <i className="fab fa-instagram"></i>
          </a>
        </NavMenu>
      )}
    </Nav>
  )
}
