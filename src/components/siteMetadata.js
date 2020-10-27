import { graphql, useStaticQuery } from "gatsby"

export default function GetSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query siteMetadata {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  return site.siteMetadata
}
