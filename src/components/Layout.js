import React from "react"
import { Helmet } from "react-helmet"
import GetSiteMetadata from "./siteMetadata"
import Navbar from "./Navbar"
import Footer from "./Footer"
import styled from "@emotion/styled"
import "../styles.scss"

const Content = styled.div`
  margin: 0 auto;
  max-width: 1080px;
`

export default function Layout({ children }) {
  const { title, description } = GetSiteMetadata()
  return (
    <div id="App">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <script
          src="https://kit.fontawesome.com/92766b590a.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Content>
        <Navbar />
        {children}
      </Content>
      <Footer />
    </div>
  )
}
