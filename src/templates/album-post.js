import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import orderNodes from "../utils/ordering"
import PhotoRoll from "../components/PhotoRoll"

export default function AlbumPost({ data }) {
  const {
    title,
    date,
    caption: { caption },
    photos,
  } = data.contentfulAlbum
  const orderedPhotos = orderNodes(photos)

  return (
    <Layout>
      <div className="text-header">
        <h1 class="album-info__title">{title}</h1>
        <h3 class="album-info__date">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <p class="album-info__caption">{caption}</p>
      </div>
      <PhotoRoll photos={orderedPhotos} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumPostByID($contentful_id: String!) {
    contentfulAlbum(contentful_id: { eq: $contentful_id }) {
      title
      date
      caption {
        caption
      }
      photos {
        id
        title
        description
        createdAt(formatString: "MMMM D, YYYY")
        fluid(quality: 100, maxWidth: 2400) {
          ...GatsbyContentfulFluid
        }
        fields {
          album_tags {
            id
            title
          }
        }
      }
    }
  }
`
