import React from "react"
import styled from "@emotion/styled"

const FooterContainer = styled.footer`
  background-color: var(--secondary-background);
  padding: 1rem;
`

const FooterHeader = styled.h4`
  text-align: center;
  margin: 0;
  color: white;
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterHeader>Thanks for visiting</FooterHeader>
    </FooterContainer>
  )
}
