import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { kebabCase } from "lodash"

const AlbumThumbnail = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  padding-top: ${props => 100 / props.aspectRatio}%;
  position: relative;
  width: 100%;
`

const AlbumTeaserContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.75em 1em;
  position: absolute;
  bottom: 0;
  width: calc(100% - 2em);
`

const AlbumTeaserHeading = css`
  display: inline-block;
`

const AlbumTeaser = ({ title, date, caption }) => {
  return (
    <AlbumTeaserContainer>
      <h2 css={AlbumTeaserHeading}>{title}</h2>
      <h2 style={{ margin: "0 0.3em" }} css={AlbumTeaserHeading}>
        |
      </h2>
      <h4 css={AlbumTeaserHeading}>{date}</h4>
    </AlbumTeaserContainer>
  )
}

const AlbumItemContainer = styled(Link)`
  width: 100%;
  padding-bottom: 1em;
`

const AlbumItem = props => {
  const { title, date, src, aspectRatio, caption } = props
  return (
    <AlbumItemContainer className="Item" to={`/albums/${kebabCase(title)}`}>
      <AlbumThumbnail src={src} aspectRatio={aspectRatio}>
        <AlbumTeaser title={title} date={date} caption={caption} />
      </AlbumThumbnail>
    </AlbumItemContainer>
  )
}

export default function Albums({ data }) {
  const {
    allContentfulAlbum: { edges },
  } = data

  return (
    <Layout>
      {edges.map(edge => {
        const {
          node: {
            id,
            title,
            date,
            thumbnail: {
              fixed: { src, aspectRatio },
              description,
            },
            caption: { caption },
          },
        } = edge
        return (
          <AlbumItem
            key={id}
            title={title}
            date={date}
            src={src}
            aspectRatio={aspectRatio}
            description={description}
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
            fixed(width: 800) {
              src
              aspectRatio
            }
            description
          }
          caption {
            caption
          }
        }
      }
    }
  }
`

export { AlbumTeaserContainer, AlbumThumbnail, AlbumItemContainer }
