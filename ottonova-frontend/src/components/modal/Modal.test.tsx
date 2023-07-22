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
