import React from "react";
import styled from "styled-components";
interface Props {
  children: React.ReactNode;
}
const StyledActions = styled.div`
  margin: 15px;
`;
export default function CardActions({ children }: Props) {
  return <StyledActions data-test-id="card-actions"> {children}</StyledActions>;
}
