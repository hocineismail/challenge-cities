import styled from "styled-components";

// Created the style of the button using styled components
const StyledButton = styled.button`
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

// Define the props interface for the Bytton component
interface Props {
  text: string; // text is the content of the button ex: Show, Details...
  type?: "submit" | "reset"; // Optional: The type of the button could be submit, reset or undefined
  handleClick?: () => void; // Optional: A callback function that will be triggered when the button is clicked
}

export default function Button({ text, type, handleClick }: Props) {
  // The Button component receives the 'text',  'type' and 'handleClick' props as arguments from the parent
  // Check if handleClick exist
  return handleClick ? (
    <StyledButton onClick={handleClick} type={type} data-testid="button">
      {text}
    </StyledButton>
  ) : (
    <StyledButton type={type} data-testid="button">
      {text}
    </StyledButton>
  );
}
