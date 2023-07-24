import styled from "styled-components";
import useFetchDataFromUrl from "../../hooks/useFetchDataFromUrl";
import Alert from "../alert/Alert";
import Card from "../card/Card";

import CardsSectionPlaceholder from "../loader/CardsPlaceholder";

import { City } from "../../typed/cities";

//Make sur to add your api on .env
//NOTICE: if you don't add it, it will use http://localhost:8080/
//Make sure the backend is running on the same port.

const API = process.env.REACT_APP_API || "http://localhost:8080/api/v1";

// Create style for section that contains cards\
const StyledCardsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Array of elements representing placeholders for the cards
const placeholders = Array.from({ length: 8 }, (_, index) => (
  <CardsSectionPlaceholder key={index} />
));

// Main component for rendering the cities section
export default function CitiesSection() {
  // Fetch data from a specified URL using a custom hook

  const {
    data: { cities } = { cities: [] },
    isLoading,
    errors,
  } = useFetchDataFromUrl<{ cities: City[] }>({
    url: `${API}/cities`,
    request: "cities",
  });

  // Render placeholders when loading
  if (isLoading)
    return (
      <StyledCardsSection data-testid="loading-section">
        {placeholders}
      </StyledCardsSection>
    );

  // Render error message if there are errors

  // type="danger" to display red alert

  if (errors) return <Alert text={errors} type="danger" />;

  // Render the grid of city cards if data is available
  return (
    <StyledCardsSection>
      {cities &&
        cities.map((item: City) => {
          return <Card key={item.name} {...item} />;
        })}
    </StyledCardsSection>
  );
}
