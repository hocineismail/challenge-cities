import React from "react";
import styled from "styled-components";

// Created the style of the acction section for the card using styled components
const StyledActions = styled.div`
  margin: 15px;
`;

// Define the props interface for the Card Actions component
interface Props {
  children: React.ReactNode; // children can include any valid React nodes such as elements, text, or components.
}
export default function CardActions({ children }: Props) {
  return <StyledActions data-test-id="card-actions"> {children}</StyledActions>;
}
