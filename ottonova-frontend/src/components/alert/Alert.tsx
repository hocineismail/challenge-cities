import styled from "styled-components";

// Define the interface for the styled components prop
interface StyledType {
  type: string; //The type of the alert (default or danger)
}

// Create a The style of alert using styled-components
// The component receives the StyledType interface as props

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

// Define the props interface for the Alert component
interface Props {
  text: string; // text is the content of the alert message
  type?: string; // Optional: The type of the alert (default or danger)
}
export default function Alert({ text, type = "default" }: Props) {
  // The Alert component receives the 'text' and 'type' props as arguments from the parent
  return (
    <StyledAlert type={type} data-testid="alert">
      {text}
    </StyledAlert>
  );
}
