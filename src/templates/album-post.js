import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PhotoCard from "../components/PhotoCard"
import styled from "@emotion/styled"

const IconContainer = styled.span`
  padding: 0 0.2em;
  color: white;
  margin: 0.2em;
  background-color: #444;
  display: inline-block;
  border-radius: 20%;
  &:hover {
    background-color: #555;
  }
  float: right;
`

const AlbumInfo = styled.div`
  background-color: var(--primary-background);
  color: var(--text-color-solid);
`

export default function AlbumPost({ data }) {
  console.log(data.contentfulAlbum)
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
        <AlbumInfo className="text-container">
          <h1>{title}</h1>
          <h3>
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <h5>{caption}</h5>
        </AlbumInfo>
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
