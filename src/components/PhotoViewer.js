import React, { useState, useEffect } from "react"
import BackgroundImage from "gatsby-background-image"
import { css } from "@emotion/core"
import { Link } from "gatsby"

const PhotoInfo = ({
  title,
  description,
  createdAt,
  onMinimize,
  albumTags,
}) => {
  return (
    <div
      className="info"
    >
      <div className="info__head">
        <h2 className="info__head--title">{title}</h2>
        <i
          aria-label="Minimize photo information"
          role="button"
          onKeyDown={onMinimize}
          tabIndex={-1}
          className="photo-viewer__icon photo-viewer__icon--hide icon icon--minimize fas fa-minus"
          onClick={onMinimize}
        ></i>
      </div>
      <div className="info__album-tags">
        {albumTags.map(tag => (
          <Link className="info__album-tags--link" to={`/albums/${tag.id}`}>
            {tag.title}
          </Link>
        ))}
      </div>
      <h3 className="info__details">{createdAt}</h3>
      <span className="info__details">{description}</span>
      {/* <button className="btn">
        <i className="btn--icon fas fa-shopping-cart"></i>
        <span>Buy photo</span>
      </button> */}
    </div>
  )
}

export default function PhotoViewer({ nodes, initialId, onClose }) {
  const initialIndex = nodes.findIndex(node => node.id === initialId)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [expandToggled, setExpandToggled] = useState(false)

  useEffect(() => {
    document.location =
      document.location.pathname + `#${nodes[currentIndex].id}`
    document.querySelector(".photo-viewer").focus()
  })

  const scroll = delta => {
    setCurrentIndex(prevValue => {
      const newIndex = prevValue + delta
      return newIndex >= 0 && newIndex < nodes.length ? newIndex : prevValue
    })
  }

  const scrollKey = e => {
    const key = e.charCode || e.keyCode
    if (key === 37) {
      scroll(-1)
    } else if (key === 39) {
      scroll(1)
    }
  }

  return (
    <div onKeyDown={scrollKey} tabIndex={0} className="photo-viewer">
      <i
        aria-label="Close full-screen photo viewer"
        role="button"
        onKeyDown={onClose}
        tabIndex={-1}
        onClick={onClose} className="photo-viewer__icon photo-viewer__icon--close icon fas fa-times"
      ></i>
      {currentIndex !== 0 && (
        <i
          aria-label="Scroll left"
          role="button"
          onKeyDown={() => scroll(-1)}
          tabIndex={-1}
          className="photo-viewer__scroll photo-viewer__scroll--left fas fa-chevron-left"
          onClick={() => scroll(-1)}
        ></i>
      )}
      {currentIndex !== nodes.length - 1 && (
        <i
          aria-label="Scroll right"
          role="button"
          onKeyDown={() => scroll(1)}
          tabIndex={-1}
          className="photo-viewer__scroll photo-viewer__scroll--right fas fa-chevron-right"
          onClick={() => scroll(1)}
        ></i>
      )}
      <BackgroundImage
        className="photo-viewer__photo"
        Tag="div"
        fluid={nodes[currentIndex].fluid}
        onClick={onClose}
        css={css`
          background-size: contain;
          height: 100vh;
        `}
        // loading="eager"
      ></BackgroundImage>
      {expandToggled ? (
        <PhotoInfo
          albumTags={nodes[currentIndex].fields.album_tags}
          description={nodes[currentIndex].description}
          title={nodes[currentIndex].title}
          createdAt={nodes[currentIndex].createdAt}
          onMinimize={() => setExpandToggled(false)}
        />
      ) : (
        <i
          aria-label="Show photo information"
          role="button"
          tabIndex={-1}
          className="photo-viewer__icon photo-viewer__icon--show icon fas fa-ellipsis-h"
          onClick={() => setExpandToggled(true)}
          onKeyDown={() => setExpandToggled(true)}
        ></i>
      )}
    </div>
  )
}
