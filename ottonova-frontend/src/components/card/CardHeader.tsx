import React from "react";
import styled from "styled-components";

// Create the style of CardHeader using styled-components
const StyledCardHeader = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  margin: 15px;
`;
const StyledDiv = styled.div``;

const StyledIcon = styled.div`
  margin-top: 10px;
`;
const StyledTitle = styled.h2`
  font-size: clamp(1rem, 4vw, 1.3rem);
  line-height: 0.3;
`;
const StyledSubTitle = styled.h3`
  font-size: clamp(0.8rem, 3vw, 1rem);
  line-height: 0.3;
  font-weight: normal;
`;
const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray};
  margin: 0px 10px;
`;

// Define the props interface for the Card Content component
interface Props {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
}

export default function CardHeader({ icon, title, subTitle }: Props) {
  return (
    <>
      <StyledCardHeader data-testid="header-card">
        <StyledIcon data-testid="header-card-icon">{icon}</StyledIcon>
        <StyledDiv>
          <StyledTitle data-testid="header-card-title">{title}</StyledTitle>
          <StyledSubTitle data-testid="header-card-subtitle">
            {subTitle}
          </StyledSubTitle>
        </StyledDiv>
      </StyledCardHeader>
      <StyledHr />
    </>
  );
}
