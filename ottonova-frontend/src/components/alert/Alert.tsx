import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  type: string;
}
interface StyledType {
  type?: string | undefined;
}
const StyledAlert = styled.div<StyledType>`
  border: 1px solid ${(props) => (props.type === "danger" ? "#f65c96" : "gray")};
  color: ${(props) => (props.type === "danger" ? "#f65c96" : "black")};
  border-radius: 10px;
  min-height: 45px;
  padding: 20px;
  margin-top: 100px;
  font-size: 1.5rem;
  width: 100%;
  background-color: ${(props) =>
    props.type === "danger" ? "#FEF2F7" : "white"};
`;
export default function Alert({ text, type = "default" }: Props) {
  return <StyledAlert type={type}>{text}</StyledAlert>;
}
