import { HamburguerMenuController } from "./classes/HamburguerMenuController";
import { ProductCardsController } from "./classes/ProductCardsController";
import { ServicesCardsController } from "./classes/ServicesCardsController";

document.addEventListener("DOMContentLoaded", () => {
  new HamburguerMenuController();
  new ProductCardsController();
  new ServicesCardsController();
});
