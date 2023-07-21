import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  type?: string | undefined;
  handleClick?: () => void | undefined;
}
interface Style {
  type?: string | undefined;
}
const StyledButton = styled.button<Style>`
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.textButton};
  height: 45px;
  width: 100%;
  min-width: 100px;
  max-width: 400px;
  font-size: 18px;
  border-radius: 14px;
  border-color: transparent;
  cursor: pointer;
`;

export default function Button({ text, type, handleClick }: Props) {
  return handleClick ? (
    <StyledButton onClick={handleClick} type={type}>
      {text}
    </StyledButton>
  ) : (
    <StyledButton type={type}>{text}</StyledButton>
  );
}
