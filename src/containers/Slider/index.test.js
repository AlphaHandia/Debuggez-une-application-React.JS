import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const mockdata = {
  focus: [
    {
      "id": 101,
      "title": "World economic forum",
      "description": "Oeuvre à la coopération entre le secteur public et le privé.",
      "date": "2022-01-29T20:28:45.744Z",
      "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
  },
  {   
      "id": 102,  
      "title": "Nordic design week",
      "description": "Conférences sur le design de demain dans le digital",
      "date": "2022-03-29T20:28:45.744Z",
      "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
  },
  {
      "id": 103,
      "title": "Sneakercraze market",
      "description": "Rencontres de spécialistes des Sneakers Européens.",
      "date": "2022-05-29T20:28:45.744Z",
      "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
  }
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
 api.loadData = jest.fn().mockReturnValue(mockdata);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
        // console.log pour vérifier mockdata.
        console.log("Mock data:", mockdata);

    //  utilisation d'un data-testid pour chaque élément du slider.
    const cardTitles = await screen.findAllByTestId("slide-card-title");
    const cardDescriptions = await screen.findAllByTestId("slide-card-description");
    const cardMonths = await screen.findAllByTestId("slide-card-month");

    // assure  que le nombre de cartes correspond aux données.
    expect(cardTitles).toHaveLength(mockdata.focus.length);

    // Vous pouvez également vérifier le contenu de chaque carte.
    expect(cardTitles[0]).toHaveTextContent("World economic forum");
    expect(cardDescriptions[0]).toHaveTextContent("Oeuvre à la coopération entre le secteur public et le privé.");
    expect(cardMonths[0]).toHaveTextContent("janvier");

    
  });
});
// test expliqué 
// Mocke la fonction api.loadData pour simuler le chargement de données via mockReturnValue(mockdata).
// Rend le composant Slider enveloppé dans le contexte de données DataProvider.
// Utilise screen.findAllByTestId pour sélectionner toutes les cartes du slider par leur data-testid.
// Affiche les informations de chaque carte, telles que le titre, la description et le mois, en utilisant les data-testid spécifiés.
// Utilise expect pour vérifier que le nombre de cartes correspond au nombre de données dans mockdata.focus.
