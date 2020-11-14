import React from "react"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

export default function PhotoCard({ node, width, onToggle }) {
  const { id, fluid } = node

  return (
    <div className={`photo-card photo-card--${width}`} id={id}>
      <BackgroundImage
        Tag="section"
        fluid={fluid}
        backgroundColor={`#040e18`}
        onClick={() => onToggle(id)}
        className="photo-card__image"
      >
        <div className="photo-card__hover">
          <i className="fas fa-expand"></i>
        </div>
      </BackgroundImage>
    </div>
  )
}

// min(100vh, calc(100vw / ${fluid.aspectRatio}));
// height: 80vh;
// width: ${width}%;
