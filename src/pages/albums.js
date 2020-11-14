import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const AlbumTeaser = ({ title, date }) => {
  return (
    <div className="album-thumbnail__teaser">
      <h2 className="album-thumbnail__teaser--heading">{title}</h2>
      <h3 className="album-thumbnail__teaser--subheading">{date}</h3>
    </div>
  )
}

const AlbumItem = ({ id, title, date, fluid, caption }) => {
  return (
    <Link className="album-item" to={`/albums/${id}`}>
      <BackgroundImage
        fluid={fluid}
        backgroundColor={`#040e18`}
        Tag="section"
        css={css`
          height: min(50vh, calc(100vw / ${fluid.aspectRatio}));
        `}
      >
        <AlbumTeaser title={title} date={date} />
      </BackgroundImage>
    </Link>
  )
}

export default function Albums({ data }) {
  const heroImage = data.contentfulAlbumsPage.heroImage
  const edges = data.allContentfulAlbum.edges

  return (
    <Layout>
      <BackgroundImage
        Tag="section"
        className="page-hero-image"
        fluid={heroImage.fluid}
        backgroundColor={`#040e18`}
        style={{ backgroundPosition: "top" }}
      >
        <h1 className="page-heading">Albums</h1>
      </BackgroundImage>
      <div className="album-roll">
        {edges.map(edge => {
          const {
            node: {
              contentful_id,
              title,
              date,
              thumbnail: { fluid },
              caption: { caption },
            },
          } = edge
          return (
            <AlbumItem
              key={contentful_id}
              id={contentful_id}
              title={title}
              date={date}
              fluid={fluid}
              caption={caption}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumsQuery {
    contentfulAlbumsPage {
      heroImage {
        fluid(maxWidth: 2400) {
          ...GatsbyContentfulFluid
        }
      }
    }
    allContentfulAlbum {
      edges {
        node {
          contentful_id
          title
          date(formatString: "MMMM, YYYY")
          thumbnail {
            fluid(maxWidth: 2400) {
              ...GatsbyContentfulFluid
            }
          }
          caption {
            caption
          }
        }
      }
    }
  }
`
