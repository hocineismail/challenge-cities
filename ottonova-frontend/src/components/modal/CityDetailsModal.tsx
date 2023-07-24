import React from "react";
import Modal from "./Modal";
import { AppContext } from "../../store/context";
import { TOGGLE_MODAL } from "../../constants/store";
import CardHeader from "../card/CardHeader";
import { LiaCitySolid } from "react-icons/lia";
import CardContent from "../card/CardContent";
import styled from "styled-components";

// Styled component for the content Modal

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
  // The global state we need city and isModalVisible
  // City contains details of the city that we will display it on the modal
  // isModalVisible: (boolean) is the state of modal;

  const {
    state: { city, isModalVisible },
    dispatch,
  } = React.useContext(AppContext);
  // closeModal calls when clicking on close button on child component
  const closeModal = (): void => {
    // dispatch enables to update the state, dispatch({ type: TOGGLE_MODAL })} will clean the city and update value of isModalVisible to false
    dispatch({ type: TOGGLE_MODAL });
  };
  return (
    <div data-testid="city-details-modal">
      <Modal
        isOpen={isModalVisible}
        onClose={closeModal}
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
    </div>
  );
}

// Define the props interface for the MapWithIframe component
interface MapProps {
  latitude: string;
  longitude: string;
}

// latitude and longitude, received from the parent, allow us to show the location on the map using openMap.
const MapWithIframe = ({ latitude, longitude }: MapProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div></div>}
      <iframe
        src={mapUrl}
        style={{
          border: "1px solid gray",
          borderRadius: "19px",
          width: "100%",
          height: "200px",
        }}
        title="Map"
        onLoad={handleLoad}
      />
    </>
  );
};
