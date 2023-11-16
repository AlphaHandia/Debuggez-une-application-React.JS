import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";

describe("When a button is created", () => {
  it("the button must include a title", () => {
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    const buttonElement = screen.getByTitle("my-button");
    expect(buttonElement).toBeInTheDocument();
  });
  it("the button must display a label", () => {
    render(<Button>label</Button>);
    const buttonElement = screen.getByText(/label/);
    expect(buttonElement).toBeInTheDocument();
  });
  describe("and it's clicked", () => {
    it("an event onClick it executed", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);
      const buttonElement = screen.getByTestId("button-test-id");
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });
  describe("and selected type is submit", () => {
    it("an input submit is created", () => {
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      const buttonElement = screen.getByTestId("button-test-id");
      expect(buttonElement.type).toEqual("submit");
    });
  });
});
// explication de test : 
// vérification de l'inclusion d'un titre dans le bouton
// vérification de l'affichage d'une étiquette"label" dans le bouton
// vérification de l' Exécution de l'événement onClick lors du clic
// test de création d'un input de type submit lorsque le type est BUTTON_TYPES.SUBMIT