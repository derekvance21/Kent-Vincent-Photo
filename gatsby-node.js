const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const AlbumTemplate = path.resolve(`src/templates/album-post.js`)

  return graphql(`
    query loadAlbums {
      allContentfulAlbum {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const albums = result.data.allContentfulAlbum.edges
    albums.forEach(({ node }) => {
      createPage({
        path: `/albums/${node.id}`,
        component: AlbumTemplate,
        context: {
          id: node.id,
        },
      })
    })
  })
}
