import styled from "styled-components";
import Button from "../button/Button";
import CardActions from "./CardActions";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import { LiaCitySolid } from "react-icons/lia";
import React from "react";
import { AppContext } from "../../store/context";
import { SET_CITY } from "../../constants/store";
import { addCommasToNumberString } from "../../utils/helper";

// Created the style of the card using styled components
const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
`;

// Define the props interface for the Card component
interface Props {
  founded: string;
  population: string;
  landmarks: string[];
  name: string;
  name_native: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
}

export default function Card({
  name,
  name_native,
  country,
  continent,
  latitude,
  longitude,
  population,
  founded,
  landmarks,
}: Props) {
  // The dispatch function enables us to update the global states of our application.
  // React.useContext(AppContext) allows us to access to the state and dispatch from the main parent component.
  const { dispatch } = React.useContext(AppContext);
  // Dispatches an action to set the city information in the global state.
  const handleClick = () =>
    // dispatch
    dispatch({
      type: SET_CITY,
      payload: {
        city: {
          name,
          name_native,
          country,
          continent,
          latitude,
          longitude,
          population,
          founded,
          landmarks,
        },
      },
    });
  return (
    <StyledCard data-testid="card">
      <CardHeader
        title={name}
        subTitle={name_native}
        icon={<LiaCitySolid size={42} />}
      />
      <CardContent
        founded={founded}
        population={addCommasToNumberString(population)}
        city={`${country} | ${continent}`}
        marks={landmarks}
      />
      <CardActions data-testid="card-action">
        <Button text="Details" handleClick={handleClick} />
      </CardActions>
    </StyledCard>
  );
}
