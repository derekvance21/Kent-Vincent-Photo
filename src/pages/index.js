import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import PhotoRoll from "../components/PhotoRoll"

export default function Home({ data }) {
  const heroNodeId = data.contentfulHomePage.image.id
  const edges = data.allContentfulAsset.edges
  const nodes = edges.filter(({node}) => node.id === heroNodeId).concat(
    edges.filter(({ node }) => node.id !== heroNodeId)).map(({ node }) => node)


  return (
    <Layout>
      <PhotoRoll nodes={nodes} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AssetsQuery {
    allContentfulAsset {
      edges {
        node {
          id
          description
          title
          createdAt(formatString: "MMMM D, YYYY")
          fluid(quality: 100, maxWidth: 2400) {
            ...GatsbyContentfulFluid
          }
          fields {
            album_tags {
              title
              id
            }
          }
        }
      }
    }
    contentfulHomePage {
      image {
        id
      }
    }
  }
`
