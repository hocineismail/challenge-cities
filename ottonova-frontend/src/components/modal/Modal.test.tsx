import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Modal from "./Modal";

import { lightTheme } from "../../styles/themes/lightTheme";
describe("Modal", () => {
  it("Should call onClose prop when close button is clicked", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal Content</p>
        </Modal>
      </ThemeProvider>
    );
    fireEvent.click(getByTestId("close-button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test("Should call  onClose prop when clicked outside of modal", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal Content</p>
        </Modal>
      </ThemeProvider>
    );

    fireEvent.click(getByTestId("outside"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("Shouldn't call  onClose when click onside the modal ", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={lightTheme}>
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal Content</p>
        </Modal>
      </ThemeProvider>
    );

    fireEvent.click(getByTestId("modal-container"));
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});

// import { render, screen, fireEvent } from "@testing-library/react";
// import Modal from "./Modal"; // Replace './Modal' with the actual path to your Modal component
// import { ThemeProvider } from "styled-components";
// import { lightTheme } from "../../styles/themes/lightTheme";

// // Mock the react-icons/AiOutlineClose component
// jest.mock("react-icons/ai", () => ({
//   AiOutlineClose: () => <div data-testid="mock-close-icon" />,
// }));

// // Mock the handleKeyDown function to check if it's called on key press
// jest.spyOn(document, "addEventListener");
// jest.spyOn(document, "removeEventListener");
// // Suppress the warning by overriding console.error

// describe("Modal Component:", () => {
//   it("Modal renders correctly and handles onClose", () => {
//     const b = `0`;
//   });
//   //   it("Modal renders correctly and handles onClose", () => {
//   //     const titleText = "Test Modal";
//   //     const children = <div> This is the modal content"</div>;
//   //     const onCloseMock = jest.fn();
//   //     const props = {
//   //       isOpen: true,
//   //       onClose: jest.fn(),
//   //       title: <div>{titleText}</div>,
//   //     };
//   //     render(
//   //       <ThemeProvider theme={lightTheme}>
//   //         <Modal {...props}>
//   //           <div> This is the modal content</div>
//   //         </Modal>
//   //       </ThemeProvider>
//   //     );
//   //     const modalContainer = screen.getByTestId("modal-container");
//   //     const modalContent = screen.getByTestId("modal-content");
//   //     const modalHeader = screen.getByTestId("modal-header");
//   //     const modalClose = screen.getByTestId("modal-close");
//   //     const closeIcon = screen.getByTestId("mock-close-icon");
//   //     // Check that the modal is open and visible
//   //     expect(modalContainer).toBeInTheDocument();
//   //     expect(modalContent).toBeInTheDocument();
//   //     expect(modalHeader).toBeInTheDocument();
//   //     expect(modalClose).toBeInTheDocument();
//   //     jest
//   //       .spyOn(window, "addEventListener")
//   //       .mockImplementationOnce((event, handler) => {
//   //         console.log(event);
//   //         console.log(handler);
//   //       });
//   //     // Check that the close icon is rendered and can be clicked
//   //     // expect(closeIcon).toBeInTheDocument();
//   //     // fireEvent.click(closeIcon);
//   //     // expect(onCloseMock).toHaveBeenCalledTimes(1);
//   //     // // Check if handleKeyDown is called when the 'Escape' key is pressed
//   //     // fireEvent.keyDown(modalContainer, { key: "Escape" });
//   //     // expect(onCloseMock).toHaveBeenCalledTimes(2);
//   //     // // Check if handleContainerClick is called when clicking outside the modal content
//   //     // fireEvent.click(modalContainer);
//   //     // expect(onCloseMock).toHaveBeenCalledTimes(3);
//   //   });
//   //   it("Modal is not visible when isOpen is false", () => {
//   //     const titleText = "Test Modal";
//   //     const children = <div> This is the modal content"</div>;
//   //     render(
//   //       <ThemeProvider theme={lightTheme}>
//   //         <Modal
//   //           isOpen={false}
//   //           onClose={jest.fn()}
//   //           title={<div>{titleText}</div>}
//   //         >
//   //           {children}
//   //         </Modal>
//   //       </ThemeProvider>
//   //     );
//   //     const modalContainer = screen.queryByTestId("modal-container");
//   //     const modalContent = screen.queryByTestId("modal-content");
//   //     const modalHeader = screen.queryByTestId("modal-header");
//   //     const modalClose = screen.queryByTestId("modal-close");
//   //     // Check that the modal is not visible when isOpen is false
//   //     expect(modalContainer).toBeNull();
//   //     expect(modalContent).toBeNull();
//   //     expect(modalHeader).toBeNull();
//   //     expect(modalClose).toBeNull();
//   //   });
// });
