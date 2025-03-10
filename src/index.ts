import { ContactCardsController } from "./classes/ContactCardsController";
import { HamburguerMenuController } from "./classes/HamburguerMenuController";
import { ProductCardsController } from "./classes/ProductCardsController";
import { ServicesCardsController } from "./classes/ServicesCardsController";
import { TeamCardsController } from "./classes/TeamCardsController";

document.addEventListener("DOMContentLoaded", () => {
  new HamburguerMenuController();
  new ProductCardsController();
  new ServicesCardsController();
  new TeamCardsController();
  new ContactCardsController();
});
