import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BackgroundImage from "gatsby-background-image"

export default function About({ data }) {
  const heroImage = data.contentfulAboutPage.heroImage
  const aboutText = data.contentfulAboutPage.aboutText.aboutText

  return (
    <Layout>
      <BackgroundImage
        Tag="section"
        className="page-hero-image"
        fluid={heroImage.fluid}
        backgroundColor={`#040e18`}
      >
        <h1 className="page-heading">About</h1>
      </BackgroundImage>
      <div className="text-header about">
        <div>{aboutText}</div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutQuery {
    contentfulAboutPage {
      heroImage {
        fluid(maxWidth: 2400) {
          ...GatsbyContentfulFluid
        }
      }
      aboutText {
        aboutText
      }
    }
  }
`
