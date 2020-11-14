import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import PhotoRoll from "../components/PhotoRoll"
import orderNodes from "../utils/ordering"
import BackgroundImage from "gatsby-background-image"
import { css } from "@emotion/core"

export default function Home({ data }) {
  const featuredImages = data.contentfulHomePage.featuredImages
  const heroImages = data.contentfulHomePage.heroImages
  const orderedPhotos = orderNodes(featuredImages)

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)

  // useEffect(() => {
  //   console.log("start timeout")
  //   setTimeout(() => {
  //     setCurrentHeroIndex(prevValue => {
  //       console.log(prevValue)
  //       return (prevValue + 1) % heroImages.length
  //     })
  //   }, 5000)
  //   console.log("timeout done")
  // }, [currentHeroIndex, heroImages.length])

  return (
    <Layout>
      <div
        css={css`
          background-color: white;
        `}
      >
        <BackgroundImage
          Tag="section"
          className="hero-image"
          fluid={heroImages[currentHeroIndex].fluid}
          backgroundColor={`#040e18`}
        >
          <div className="home-page-heading">
            <h1 className="home-page-heading__title">Kent Vincent</h1>
            <h2 className="home-page-heading__subtitle">photography</h2>
          </div>
        </BackgroundImage>
      </div>
      <PhotoRoll photos={orderedPhotos} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePageQuery {
    contentfulHomePage {
      heroImages {
        id
        fluid(quality: 100, maxWidth: 2400) {
          ...GatsbyContentfulFluid
        }
      }
      featuredImages {
        id
        description
        title
        createdAt(fromNow: true)
        fluid(quality: 100, maxWidth: 2400) {
          ...GatsbyContentfulFluid
        }
        fields {
          album_tags {
            title
            id
          }
        }
      }
    }
  }
`

// allContentfulAsset {
//   edges {
//     node {
//       id
//       description
//       title
//       createdAt(formatString: "MMMM D, YYYY")
//       fluid(quality: 100, maxWidth: 2400) {
//         ...GatsbyContentfulFluid
//       }
//       fields {
//         album_tags {
//           title
//           id
//         }
//       }
//     }
//   }
// }
