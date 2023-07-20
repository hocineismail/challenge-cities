import styled from "styled-components";
import useFetchDataFromUrl from "../../hooks/useFetchDataFromUrl";
import Alert from "../alert/Alert";
import Card from "../card/Card";
import { City } from "../../typed/cities";
import CardsSectionPlaceholder from "../loader/CardsPlaceholder";

// Styled component representing the grid layout for the cards
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
  const { data, isLoading, errors } = useFetchDataFromUrl({ url: "heloo" });

  // Render placeholders when loading
  if (isLoading) return <StyledCardsSection>{placeholders}</StyledCardsSection>;

  // Render error message if there are errors
  // type danger or default
  if (errors) return <Alert text={errors} type="danger" />;

  // Render the grid of city cards if data is available
  return (
    <StyledCardsSection>
      {data &&
        data.map((item: City) => {
          return <Card key={item.name} {...item} />;
        })}
    </StyledCardsSection>
  );
}
