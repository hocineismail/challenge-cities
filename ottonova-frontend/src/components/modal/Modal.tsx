import React from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

// Props interface for the ModalContainer component.
interface StyledProps {
  isOpen: boolean; // A boolean indicating whether the modal is currently open or closed.
}

//  Create a The style of modal container using styled-components
// It uses the 'isOpen' prop to control the visibility and opacity of the modal with CSS transitions.
const ModalContainer = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...rest }: StyledProps & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...rest} />
  )
)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out;
`;

// Create a The animation of the modal using styled-components

const modalOpenAnimation = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

// Create a The style of modal content using styled-components
const ModalContent = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...rest }: StyledProps & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...rest} />
  )
)<StyledProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid gray;
  padding: 0px 16px 16px 16px;
  border-radius: 10px;
  width: 90%;
  margin: 10px;
  min-height: 100px;
  max-width: 550px;
  position: relative;
  transform-origin: center center;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  // animation-name: ${(props) => (props.isOpen ? modalOpenAnimation : "none")};
  animation-fill-mode: forwards;
`;

//  Create a The style of Header of modal using styled-components
const HeaderSection = styled.div`
  display: block;
  marginbottom: 13px;
  color: ${({ theme }) => theme.colors.text};
  fontweight: bold;
`;

//  Create a The style of close button using styled-components
const StyledClose = styled.button`
  position: absolute;
  cursor: pointer;
  right: 25px;
  top: 25px;
  border-color: transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

// Props interface for the Modal component
interface Props {
  isOpen: boolean; // A boolean indicating the state of the modal, closed or opened.
  onClose: () => void; // A callback function to be invoked when the modal is closed.
  children: React.ReactNode; // The content or components that will be displayed inside the modal.
  title: React.ReactNode; // The title of the modal, represented as React nodes.
}

const Modal = ({ isOpen, onClose, children, title }: Props) => {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // useCallback to memoize the handleContainerClick function
  const handleContainerClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const modalContent = document.getElementById("modal-content");
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );
  return (
    <ModalContainer
      isOpen={isOpen}
      onClick={handleContainerClick}
      data-testid="outside"
    >
      <ModalContent
        isOpen={isOpen}
        data-testid="modal-container "
        id="modal-content"
      >
        <HeaderSection>
          <StyledClose data-testid="close-button" onClick={() => onClose()}>
            <AiOutlineClose size={28} />
          </StyledClose>
          {title}
        </HeaderSection>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
