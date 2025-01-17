import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import EventList from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );
       // Attendre que le texte "avril" soit présent
       await screen.findByText("avril");

       // Rechercher tous les éléments avec l'attribut data-testid="event-card"
       const eventCards = await screen.findAllByTestId("event-card");
   
       // Vérifier que le nombre d'éléments correspond au nombre d'événements dans les données
       expect(eventCards.length).toBe(data.events.length);
     
  });
  describe("and an error occured", () => {
    it("an error message is displayed", async () => {
      api.loadData = jest.fn().mockRejectedValue();
      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    });
  });
  describe("and we select a category", () => {
    it.only("an filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );
      await screen.findByText("Forum #productCON");
      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      fireEvent(
        (await screen.findAllByText("soirée entreprise"))[0],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await screen.findByText("Conférence #productCON");
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );

      fireEvent(
        await screen.findByText("Conférence #productCON"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
// est expliqué :
// Affichage de la liste des cartes d'événements
// Affichage d'un message d'erreur en cas d'erreur de chargement des données
// Affichage d'une liste filtrée en fonction de la catégorie sélectionnée
// Affichage des détails d'un événement après un clic