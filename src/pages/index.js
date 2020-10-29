import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import PhotoCard from "../components/PhotoCard"

export default function Home({ data }) {
  const heroNode = data.contentfulHomePage.image
  const edges = data.allContentfulAsset.edges
  return (
    <Layout>
      <PhotoCard node={heroNode} />
      {edges.map(({ node }) => {
        return (
          node.id !== heroNode.id && <PhotoCard key={node.id} node={node} />
        )
      })}
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
          fluid(maxWidth: 1400) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    contentfulHomePage {
      image {
        id
        description
        title
        createdAt(formatString: "MMMM D, YYYY")
        fluid(maxWidth: 1400) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
