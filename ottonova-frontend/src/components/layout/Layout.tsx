import React from "react";
import styled from "styled-components";

// Create the style of layout using styled-compoents
const StyledContainer = styled.div`
  /* Styles for all screen sizes */
  max-width: 1100px !important;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 576px) {
    padding-right: 10px;
    padding-left: 10px;
  }
`;

// Define the props interface for the Layout
type Props = {
  children: React.ReactNode; // children can include any valid React nodes such as elements, text, or components.
};

export default function Layout({ children }: Props) {
  return <StyledContainer data-testid="layout">{children}</StyledContainer>;
}
