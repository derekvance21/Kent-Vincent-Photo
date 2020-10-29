import React, { useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const DateHeader = styled.h3`
  color: #ccc;
  padding: 0 0 0.5em 0.5em;
`

const InfoDetails = ({ createdAt, description }) => {
  return (
    <div>
      <DateHeader>{createdAt}</DateHeader>
      <span>{description}</span>
    </div>
  )
}

const PhotoInfoContainer = styled.div`
  color: white;
  padding: 0.5em 0.75em;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
`

const InfoHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5em;
`

const IconContainer = styled.i`
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  &:hover {
    background-color: #555;
  }
`

const minimizeStyle = css`
  border-radius: 20%;
  padding: 0.2em 0.15em 0em 0.15em;
  margin: 0.1em;
`

const ellipsisStyle = css`
  border-radius: 50%;
  padding: 0.1em 0.2em;
`

const BuyButton = styled.button`
  display: block;
  background-color: #415189;
  border-radius: 2em;
  border: 1px solid #314179;
  cursor: pointer;
  color: white;
  font-size: 1em;
  padding: 0.5em 1em;
  margin-top: 0.8em;
  &:hover {
    background-color: #536a9d;
  }
`

const PhotoInfo = ({ title, description, createdAt, onMinimize }) => {
  const [detailsToggled, setDetailsToggled] = useState(false)
  const handleDetailsClick = e => {
    setDetailsToggled(true)
  }

  return (
    <PhotoInfoContainer
      onClick={e => {
        e.stopPropagation()
      }}
      className="text-overlay"
    >
      <InfoHead>
        <h2 style={{ display: "inline-block" }}>{title}</h2>
        <span>
          <IconContainer
            className="fas fa-minus"
            onClick={onMinimize}
            css={minimizeStyle}
          ></IconContainer>
        </span>
      </InfoHead>
      {detailsToggled ? (
        <InfoDetails createdAt={createdAt} description={description} />
      ) : (
        <span>
          <IconContainer
            className="fas fa-ellipsis-h"
            css={ellipsisStyle}
            onClick={handleDetailsClick}
          ></IconContainer>
        </span>
      )}
      <BuyButton>
        <i
          style={{ marginRight: "0.5em" }}
          className="fas fa-shopping-cart"
        ></i>
        <span>Buy photo</span>
      </BuyButton>
    </PhotoInfoContainer>
  )
}

export default function PhotoCard({ node }) {
  const { description, title, createdAt, fluid } = node

  const [expandToggled, setExpandToggled] = useState(false)

  const handleExpandToggle = () => setExpandToggled(prevValue => !prevValue)
  const handleMinimize = () => {
    setExpandToggled(false)
  }

  return (
    <div className="Card">
      <BackgroundImage
        Tag="section"
        fluid={fluid}
        backgroundColor={`#040e18`}
        onClick={handleExpandToggle}
        css={css`
          height: min(100vh, calc(100vw / ${fluid.aspectRatio}));
        `}
      >
        {expandToggled && (
          <PhotoInfo
            description={description}
            title={title}
            createdAt={createdAt}
            onMinimize={handleMinimize}
          />
        )}
      </BackgroundImage>
    </div>
  )
}
