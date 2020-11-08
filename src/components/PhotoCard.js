import React from "react"
import { css } from "@emotion/core"
import BackgroundImage from "gatsby-background-image"

export default function PhotoCard({ node, onToggle }) {
  const {
    id,
    fluid,
  } = node

  return (
    <div className="Card" id={id}>
      <BackgroundImage
        className="photo-card"
        Tag="section"
        fluid={fluid}
        backgroundColor={`#040e18`}
        onClick={() => onToggle(id)}
        css={css`
          height: min(100vh, calc(100vw / ${fluid.aspectRatio}));
        `}
      >
      </BackgroundImage>
    </div>
  )
}
