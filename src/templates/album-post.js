import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PhotoCard from "../components/PhotoCard"

export default function AlbumPost({ data }) {
  const {
    id,
    title,
    date,
    caption: { caption },
    photos,
  } = data.contentfulAlbum

  return (
    <Layout>
      <div className="Card">
        <div className="text-header">
          <h1>{title}</h1>
          <h3>
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <h5>{caption}</h5>
        </div>
      </div>
      {photos.map(photo => {
        return <PhotoCard key={photo.id} node={photo} />
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumPostByID($id: String!) {
    contentfulAlbum(id: { eq: $id }) {
      id
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
        fluid(maxWidth: 1400) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
