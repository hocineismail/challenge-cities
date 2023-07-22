import styled, { keyframes } from "styled-components";

// Define the TypePlaceholder interface for the Style
interface TypePlaceholder {
  type: "image" | "text"; // This type should be image or text
}
// Animation keyframes for the placeholder animation
const placeholderAnimation = keyframes`
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
`;

// Styled component for the placeholder
const Placeholder = styled.div<TypePlaceholder>`
  width: 100%;
  height: ${(props) => (props.type === "text" ? " 20px" : "50px")};
  margin-top: 10px;
  background-color: #eee;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    animation: ${placeholderAnimation} 2s infinite;
  }
`;

// Styled component for the card header
const StyledCardHeader = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  margin: 15px;
  gap: 10px;
`;

// Styled component for a div element
const StyledDiv = styled.div``;

// Styled component for horizontal line separator
const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #d7d7d7;
  margin: 0px 10px;
`;

// Styled component for the card container
const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
`;

// Component for rendering the placeholder card section
export default function CardsSectionPlaceholder() {
  return (
    <StyledCard>
      <StyledCardHeader>
        <Placeholder type="image" data-testid="placeholder-image" />
        <StyledDiv>
          <Placeholder type="text" data-testid="placeholder-text1" />
          <Placeholder type="text" data-testid="placeholder-text2" />
        </StyledDiv>
      </StyledCardHeader>
      <Placeholder type="text" data-testid="placeholder-text3" />
      <Placeholder type="text" data-testid="placeholder-text4" />
      <Placeholder type="text" data-testid="placeholder-text5" />
      <Placeholder type="text" data-testid="placeholder-text6" />
      <StyledHr />
    </StyledCard>
  );
}
