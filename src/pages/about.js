import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styled from "@emotion/styled"

const AboutContainer = styled.div`
  color: var(--text-color-solid);
`

const AboutHTML = styled.div`
  line-height: 2;
`

export default function About({ data }) {
  const html = {
    __html: data.contentfulAboutPage.aboutText.childContentfulRichText.html,
  }
  return (
    <Layout>
      <AboutContainer className="text-container">
        <AboutHTML dangerouslySetInnerHTML={html}></AboutHTML>
      </AboutContainer>
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
