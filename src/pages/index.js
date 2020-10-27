import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import PhotoItem from "../components/PhotoItem"

const HeaderTitle = styled.h1`
  position: relative;
  text-align: center;
  font-size: 3rem;
  color: white;
  top: calc(50% - 1em);
`

export default function Home({ data }) {
  const edges = data.allContentfulAsset.edges
  return (
    <Layout>
      {edges.map((edge, index) => {
        const node = edge.node
        return <PhotoItem key={node.id} node={node}></PhotoItem>
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
          createdAt(formatString: "MMMM Do, YYYY")
          fixed {
            src
            aspectRatio
          }
        }
      }
    }
  }
`
