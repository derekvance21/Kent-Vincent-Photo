import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function About({ data }) {
  const html = {
    __html: data.contentfulAboutPage.aboutText.childContentfulRichText.html,
  }
  return (
    <Layout>
      <div className="text-header about">
        <div dangerouslySetInnerHTML={html}></div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutQuery {
    contentfulAboutPage {
      aboutText {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
