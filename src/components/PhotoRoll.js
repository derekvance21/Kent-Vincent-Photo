import React, { useState } from "react"
import PhotoCard from "./PhotoCard"
import PhotoViewer from "./PhotoViewer"

export default function PhotoRoll({ nodes }) {
  const [photoViewerMode, setPhotoViewerMode] = useState(false)
  const [initialId, setInitialId] = useState(null)

  const turnOnPhotoViewerMode = id => {
    setInitialId(id)
    document.getElementById("navbar").style.display = "none"
    setPhotoViewerMode(true)
  }

  const turnOffPhotoViewerMode = () => {
    document.getElementById("navbar").style.display = "block"
    setPhotoViewerMode(false)
  }

  const handleKeyDown = e => {
    const key = e.charCode || e.keyCode
    if (key === 27) {
      turnOffPhotoViewerMode()
    }
  }

  return (
    <div role="button" onKeyDown={handleKeyDown} tabIndex={0} className="content">
      {nodes.map(node => (
        <PhotoCard
          id={node.id}
          key={node.id}
          node={node}
          onToggle={turnOnPhotoViewerMode}
        />
      ))}
      {photoViewerMode && (
        <PhotoViewer
          onClose={turnOffPhotoViewerMode}
          nodes={nodes}
          initialId={initialId}
        />
      )}
    </div>
  )
}
