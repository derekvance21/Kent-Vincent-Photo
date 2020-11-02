import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const AlbumTeaserHeading = css`
  display: inline-block;
`

const AlbumTeaser = ({ title, date, caption }) => {
  return (
    <div className="album-thumbnail__teaser text-overlay">
      <h2 className="album-thumbnail__teaser--heading">{title}</h2>
      <h2 className="album-thumbnail__teaser--heading">
        |
      </h2>
      <h4 className="album-thumbnail__teaser--heading">{date}</h4>
    </div>
  )
}

const AlbumItem = ({ id, title, date, fluid, caption }) => {
  return (
    <Link className="Card" to={`/albums/${id}`}>
      <BackgroundImage
        fluid={fluid}
        backgroundColor={`#040e18`}
        Tag="section"
        css={css`
          height: min(100vh, calc(100vw / ${fluid.aspectRatio}));
        `}
      >
        <AlbumTeaser title={title} date={date} caption={caption} />
      </BackgroundImage>
    </Link>
  )
}

export default function Albums({ data }) {
  const edges = data.allContentfulAlbum.edges

  return (
    <Layout>
      {edges.map(edge => {
        const {
          node: {
            id,
            title,
            date,
            thumbnail: { fluid },
            caption: { caption },
          },
        } = edge
        return (
          <AlbumItem
            key={id}
            id={id}
            title={title}
            date={date}
            fluid={fluid}
            caption={caption}
          />
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumsQuery {
    allContentfulAlbum {
      edges {
        node {
          id
          title
          date(formatString: "MMMM, YYYY")
          thumbnail {
            fluid(maxWidth: 1400) {
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
