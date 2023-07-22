import styled from "styled-components";

// Create the style for Card content
const StyledCardContent = styled.div`
  margin: 15px;
  font-size: clamp(14px, 2vw, 0.8rem);
`;

const BoldText = styled.span`
  font-size: clamp(14px, 2vw, 0.8rem);
  font-weight: bold;
`;
const Text = styled.div`
  font-weight: normal;
  font-size: clamp(14px, 2vw, 0.8rem);
`;

const StyledList = styled.ul`
  font-size: clamp(14px, 2vw, 0.8rem);
  margin-left: 10px;
  margin-top: 0px;
  padding-left: 15px;
`;
const StyledListitem = styled.li`
  font-size: clamp(0.8rem, 3vw, 1rem);
`;

// Define the props interface for the Card Content component
interface Props {
  founded: string;
  population: string;
  city: string;
  marks: string[];
}

export default function CardContent({
  founded,
  population,
  city,
  marks,
}: Props) {
  return (
    <StyledCardContent>
      <BoldText data-testid="card-city">{city}</BoldText>
      <Text data-testid="card-founded">
        <BoldText>Founded: </BoldText>
        {founded}
      </Text>
      <Text data-testid="card-population">
        <BoldText>Population: </BoldText>
        {population}
      </Text>
      <Text data-testid="card-marks">
        <BoldText>Marks: </BoldText>
      </Text>
      <StyledList data-testid="card-marks-list">
        {marks.map((item) => (
          <StyledListitem key={item} data-testid="card-mark-item">
            {item}
          </StyledListitem>
        ))}
      </StyledList>
    </StyledCardContent>
  );
}
