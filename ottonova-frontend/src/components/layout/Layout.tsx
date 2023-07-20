import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};
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
export default function Layout({ children }: Props) {
  return <StyledContainer data-test-id="layout">{children}</StyledContainer>;
}
