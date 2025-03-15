import { ContactCardsController } from "./classes/Cards/ContactCardsController";
import { FooterCardsController } from "./classes/Cards/FooterCardsController";
import { ProductCardsController } from "./classes/Cards/ProductCardsController";
import { ServicesCardsController } from "./classes/Cards/ServicesCardsController";
import { TeamCardsController } from "./classes/Cards/TeamCardsController";
import { ContactFormController } from "./classes/Form/ContactFormController";
import { FooterFormController } from "./classes/Form/FooterFormController";
import { HamburguerMenuController } from "./classes/HamburguerMenuController";

document.addEventListener("DOMContentLoaded", () => {
  new HamburguerMenuController();
  new ProductCardsController();
  new ServicesCardsController();
  new TeamCardsController();
  new ContactCardsController();
  new FooterCardsController();
  new ContactFormController();
  new FooterFormController();
});
