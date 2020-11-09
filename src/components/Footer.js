import React from "react"
import { Link } from "gatsby"

export default function Footer() {
  return (
    <div className="footer">
      <div className="row footer-section">
        <h3 className="footer__text footer__text--header">Links</h3>
        <div className="footer-section__items">
          <Link className="footer__text footer__text--link" to="/">
            Home
          </Link>
          <Link className="footer__text footer__text--link" to="/albums">
            Albums
          </Link>
          <Link className="footer__text footer__text--link" to="/about">
            About
          </Link>
        </div>
      </div>
      <div className="row footer-section">
        <h3 className="footer__text footer__text--header">Contact</h3>
        <div className="footer-section__items">
          <a
            className="footer__text footer__text--link"
            href="mailto:EMAIL@EMAIL.com"
          >
            EMAIL@EMAIL.com
          </a>
        </div>
      </div>
      <div className="row footer__bottom">
        <h4 className="footer__text">&copy; 2020</h4>
      </div>
    </div>
  )
}
