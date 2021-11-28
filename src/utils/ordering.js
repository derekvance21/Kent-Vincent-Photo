export default function orderNodes(nodes) {
  let photoCards = []

  let portraits, landscapes, wides
  wides = []
  portraits = []
  landscapes = []
  nodes.forEach(node => {
    const {
      fluid: { aspectRatio },
    } = node
    if (aspectRatio >= 2) {
      wides.push(node)
    } else if (aspectRatio > 1.2) {
      landscapes.push(node)
    } else {
      portraits.push(node)
    }
  })
  const addToPhotoCards = function (nodes, width) {
    const node = nodes.pop()

    const newCard = { node, width }
    photoCards.push(newCard)
  }
  let thirdsPairingIndex = 0
  const thirdsPairingFunctions = [
    () => {
      addToPhotoCards(portraits, "1-of-3")
    },
    () => {
      addToPhotoCards(landscapes, "2-of-3")
    },
  ]
  while (
    wides.length > 0 ||
    landscapes.length > 1 ||
    (landscapes.length === 1 && portraits.length > 0)
  ) {
    if (landscapes.length > 0 && portraits.length > 0) {
      thirdsPairingFunctions[thirdsPairingIndex]()
      thirdsPairingFunctions[(thirdsPairingIndex + 1) % 2]()
      thirdsPairingIndex = (thirdsPairingIndex + 1) % 2
    }
    if (landscapes.length > 1) {
      addToPhotoCards(landscapes, "1-of-2")
      addToPhotoCards(landscapes, "1-of-2")
    }
    if (wides.length > 0) {
      addToPhotoCards(wides, "1-of-1")
    }
  }
  while (portraits.length > 0) {
    addToPhotoCards(portraits, "1-of-2")
  }
  while (landscapes.length > 0) {
    addToPhotoCards(landscapes, "1-of-2")
  }
  if (portraits.length > 0 || landscapes.length > 0 || wides.length > 0) {
    console.error(
      "Something has gone wrong! Not all the photos are in photoCards!"
    )
    console.error(portraits.length)
    console.error(landscapes.length)
    console.error(wides.length)
  }
  return photoCards
}
