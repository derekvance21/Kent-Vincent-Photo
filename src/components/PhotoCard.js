import React, { useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

const PhotoInfoDetails = ({ createdAt, description }) => {
  return (
    <div className="slide-up info__details">
      <h3 className="info__details--text">{createdAt}</h3>
      <span className="info__details--text">{description}</span>
    </div>
  )
}

const PhotoInfo = ({ title, description, createdAt, onMinimize }) => {
  const [detailsToggled, setDetailsToggled] = useState(false)
  const handleDetailsClick = e => {
    setDetailsToggled(true)
  }

  return (
    <div className="info text-overlay"
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <div className="info__head">
        <h2 className="info__head--title">{title}</h2>
        <span>
          <i
            className="icon icon--minimize fas fa-minus"
            onClick={onMinimize}
          ></i>
        </span>
      </div>
      {detailsToggled ? (
        <PhotoInfoDetails createdAt={createdAt} description={description} />
      ) : (
          <i
            className="icon icon--ellipsis fas fa-ellipsis-h"
            onClick={handleDetailsClick}
          ></i>
      )}
      <button className="btn">
        <i
          className="btn--icon fas fa-shopping-cart"
        ></i>
        <span>Buy photo</span>
      </button>
    </div>
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
        className="photo-card"
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
