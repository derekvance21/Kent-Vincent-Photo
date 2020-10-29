import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const AlbumThumbnail = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  padding-top: ${props => 100 / props.aspectRatio}%;
  position: relative;
  width: 100%;
`

const AlbumTeaserContainer = styled.div`
  background-color: --text-overlay-background;
  color: white;
  padding: 1.5em 1em;
  position: absolute;
  bottom: 0;
  width: calc(100% - 2em);
  &:hover {
    background-color: --text-overlay-background-hover;
  }
`

const AlbumTeaserHeading = css`
  display: inline-block;
`

const AlbumTeaser = ({ title, date, caption }) => {
  return (
    <AlbumTeaserContainer className="text-overlay">
      <h2 css={AlbumTeaserHeading}>{title}</h2>
      <h2 style={{ margin: "0 0.3em" }} css={AlbumTeaserHeading}>
        |
      </h2>
      <h4 css={AlbumTeaserHeading}>{date}</h4>
    </AlbumTeaserContainer>
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
