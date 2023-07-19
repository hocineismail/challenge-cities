import styled from "styled-components";
import Button from "../button/Button";
import CardActions from "./CardActions";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import { LiaCitySolid } from "react-icons/lia";

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 10px;
`;
interface Props {
  founded: string;
  population: string;
  landmarks: string[];
  name: string;
  name_native: string;
  country: string;
  continent: string;
  //   latitude: number;
  //   longitude: number;
}
export default function Card({
  name,
  name_native,
  country,
  continent,
  //   latitude,
  //   longitude,
  population,
  founded,
  landmarks,
}: Props) {
  return (
    <StyledCard data-test-id="card">
      <CardHeader
        title={name}
        subTitle={name_native}
        icon={<LiaCitySolid size={42} />}
      />
      <CardContent
        founded={founded}
        population={population}
        city={`${country} | ${continent}`}
        marks={landmarks}
      />
      <CardActions>
        <Button text="Show" />
      </CardActions>
    </StyledCard>
  );
}
