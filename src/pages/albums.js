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
    <Link className="Card" to={`/albums/${id}`}>
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
  const edges = data.allContentfulAlbum.edges

  return (
    <Layout>
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumsQuery {
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
