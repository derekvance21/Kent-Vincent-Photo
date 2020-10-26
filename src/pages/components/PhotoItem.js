import React, { useState } from "react"
import styled from "@emotion/styled"

const PhotoItemContainer = styled.div`
  padding-bottom: 1.5rem;
  background-color: rgba(0, 0, 0, 0.9);
`

const Photo = styled.div`
  padding-top: ${props => 50 / props.aspectRatio}%;
  padding-bottom: ${props => 50 / props.aspectRatio}%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`

const PhotoInfoContainer = styled.div`
  color: #bbb;
  margin: 0.5em 0.5em 0 0.5em;
`

const EllipsisContainer = styled.div`
  padding: 0.2em;
  margin: 0.2em;
  background-color: #444;
  border-radius 50%;
  display: inline-block;
  &:hover {
    background-color: #555;
  }
`

const PhotoDetailsContainer = styled.div`
  padding: 0.5em 0;
`

const PhotoDetails = ({ title, description }) => {
  return (
    <PhotoDetailsContainer>
      <h4>{title}</h4>
      <span>{description}</span>
    </PhotoDetailsContainer>
  )
}

const InfoHeader = styled.h3`
  display: inline-block;
  margin-right: 0.5em;
`

const BuyButton = styled.button`
  display: block;
  background-color: #637aad;
  border-radius: 2em;
  border: 1px solid #314179;
  cursor: pointer;
  color: #ffffff;
  font-size: 1em;
  padding: 0.5em 1em;
  margin-top: 0.6em;
  &:hover {
    background-color: #5972a7;
  }
`

const PhotoInfo = ({ title, description, createdAt }) => {
  const [detailsToggled, setDetailsToggled] = useState(false)
  const handleDetailsToggle = () => setDetailsToggled(prevValue => !prevValue)

  return (
    <PhotoInfoContainer>
      <InfoHeader style={{ display: "inline-block" }}>{createdAt}</InfoHeader>
      <EllipsisContainer onClick={handleDetailsToggle}>
        <i class="fas fa-ellipsis-h"></i>
      </EllipsisContainer>
      {detailsToggled && (
        <PhotoDetails title={title} description={description} />
      )}
      <BuyButton>Buy this photo</BuyButton>
    </PhotoInfoContainer>
  )
}

export default function PhotoItem({ node }) {
  const {
    description,
    title,
    createdAt,
    fixed: { src, aspectRatio },
  } = node

  const [expandToggled, setExpandToggled] = useState(false)

  const handleExpandToggle = () => setExpandToggled(prevValue => !prevValue)

  return (
    <PhotoItemContainer>
      <Photo
        onClick={handleExpandToggle}
        aspectRatio={aspectRatio}
        src={src}
      ></Photo>
      {expandToggled && (
        <PhotoInfo
          description={description}
          title={title}
          createdAt={createdAt}
        />
      )}
    </PhotoItemContainer>
  )
}
