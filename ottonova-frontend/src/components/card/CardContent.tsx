import styled from "styled-components";
interface Props {
  founded: string;
  population: string;
  city: string;
  marks: string[];
}

const StyledCardContent = styled.p`
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
export default function CardContent({
  founded,
  population,
  city,
  marks,
}: Props) {
  return (
    <StyledCardContent>
      <BoldText>{city}</BoldText>
      <Text>
        <BoldText>Founded: </BoldText>
        {founded}
      </Text>
      <Text>
        <BoldText>Population: </BoldText>
        {population}
      </Text>
      <Text>
        <BoldText>Marks: </BoldText>
      </Text>
      <StyledList>
        {marks.map((item) => (
          <StyledListitem key={item}>{item}</StyledListitem>
        ))}
      </StyledList>
    </StyledCardContent>
  );
}
