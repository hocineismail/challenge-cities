import React from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

interface StyledPorps {
  isOpen: boolean;
}
const ModalContainer = styled.div<StyledPorps>`
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

const modalOpenAnimation = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const ModalContent = styled.div<StyledPorps>`
  background-color: ${({ theme }) =>
    theme.colors.secondaryBackground || "white"};
  border: 1px solid gray;
  padding: 0px 16px 16px 16px;
  border-radius: 10px;
  width: 90%;
  margin: 10px;
  min-height: 100px;
  max-width: 550px;
  transform-origin: center center;

  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-name: ${(props) => (props.isOpen ? modalOpenAnimation : "none")};
  animation-fill-mode: forwards;
`;
const HeaderSection = styled.div`
  display: block;
  marginbottom: 13px;
  color: ${({ theme }) => theme.colors.primaryBackground};
  fontweight: bold;
`;
const StyledClose = styled.div`
  position: absolute;
  cursor: pointer;
  right: 25px;
  top: 25px;
`;
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, title }: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleContainerClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent && !modalContent.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClick={handleContainerClick}>
      <ModalContent isOpen={isOpen}>
        <HeaderSection>
          <StyledClose>
            <AiOutlineClose onClick={() => onClose()} size={28} />
          </StyledClose>

          {title}
        </HeaderSection>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
