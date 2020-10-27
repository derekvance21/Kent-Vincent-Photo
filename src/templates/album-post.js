import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PhotoItem from "../components/PhotoItem"
import styled from "@emotion/styled"
import {
  AlbumTeaserContainer,
  AlbumThumbnail,
  AlbumItemContainer,
} from "../pages/albums"

const AlbumTitle = styled.h1`
  display: inline-block;
`

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

const BookIconContainer = styled(IconContainer)`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1em;
  padding: 0.4em;
  border-radius: 50%;
`

export default function AlbumPost({ data }) {
  const {
    id,
    title,
    date,
    caption: { caption },
    thumbnail: {
      fixed: { src, aspectRatio },
    },
    photos,
  } = data.contentfulAlbum

  const [showAlbumInfo, setShowAlbumInfo] = useState(true)

  const handleMinimize = e => {
    e.stopPropagation() // this stops the click event from bubbling up to parent elements i.e. the image
    setShowAlbumInfo(prevValue => !prevValue)
  }

  return (
    <Layout>
      {photos.map((photo, index) => {
        return (
          <PhotoItem key={photo.id} node={photo}>
            {index === 0 &&
              (showAlbumInfo ? (
                <AlbumTeaserContainer>
                  <AlbumTitle>{title}</AlbumTitle>
                  <IconContainer onClick={handleMinimize}>
                    <i class="fas fa-minus"></i>
                  </IconContainer>
                  <h3>{date}</h3>
                  <h5>{caption}</h5>
                </AlbumTeaserContainer>
              ) : (
                <BookIconContainer onClick={handleMinimize}>
                  <i class="fas fa-book-open"></i>
                </BookIconContainer>
              ))}
          </PhotoItem>
        )
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
      thumbnail {
        fixed(width: 800) {
          src
          aspectRatio
        }
      }
      photos {
        id
        title
        description
        createdAt(formatString: "MMMM Do, YYYY")
        fixed {
          src
          aspectRatio
        }
      }
    }
  }
`
