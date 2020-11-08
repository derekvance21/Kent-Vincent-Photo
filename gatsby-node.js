const path = require("path")
const contentful = require("contentful")
const { forEach } = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "ContentfulAsset") {
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: "master", // defaults to 'master' if not set
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
    client
      .getEntries({
        links_to_asset: node.contentful_id,
      })
      .then(response => {
        let album_tags = []
        forEach(response.items, function (entry) {
          if (
            entry.sys.type === "Entry" &&
            entry.sys.contentType.sys.id === "album"
          ) {
            album_tags.push({
              title: entry.fields.title,
              id: entry.sys.id,
            })
          }
        })
        createNodeField({
          name: `album_tags`,
          node,
          value: album_tags,
        })
      })
      .catch(console.error)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulAsset implements Node {
      fields: Fields
    }
    type Fields {
      album_tags: [AlbumTag!]!
    }
    type AlbumTag {
      title: String
      id: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const AlbumTemplate = path.resolve(`src/templates/album-post.js`)

  return graphql(`
    query loadAlbums {
      allContentfulAlbum {
        edges {
          node {
            contentful_id
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
        path: `/albums/${node.contentful_id}`,
        component: AlbumTemplate,
        context: {
          contentful_id: node.contentful_id,
        },
      })
    })
  })
}
