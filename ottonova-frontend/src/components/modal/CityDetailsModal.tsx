import React from "react";
import Modal from "./Modal";
import { AppContext } from "../../store/context";
import { CLOSE_MODAL } from "../../constants/store";
import CardHeader from "../card/CardHeader";
import { LiaCitySolid } from "react-icons/lia";
import CardContent from "../card/CardContent";
import styled from "styled-components";

const StyledDetailsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default function CityDetailsModal() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    state: { city, isModalVisible },
    dispatch,
  } = React.useContext(AppContext);

  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => dispatch({ type: CLOSE_MODAL })}
      title={
        city && (
          <CardHeader
            title={city.name}
            subTitle={city.name_native}
            icon={<LiaCitySolid size={42} />}
          />
        )
      }
    >
      {city && (
        <StyledDetailsContent>
          <CardContent
            founded={city.founded}
            population={city.population}
            city={`${city.country} | ${city.continent}`}
            marks={city.landmarks}
          />
          <div style={{ margin: "10px" }}>
            <MapWithIframe
              latitude={city.latitude}
              longitude={city.longitude}
            />
          </div>
        </StyledDetailsContent>
      )}
    </Modal>
  );
}

interface MapProps {
  latitude: string;
  longitude: string;
}
const MapWithIframe = ({ latitude, longitude }: MapProps) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <iframe
      src={mapUrl}
      style={{
        border: "1px solid gray",
        borderRadius: "19px",
        width: "100%",
        height: "200px",
      }}
      title="Map"
    />
  );
};
