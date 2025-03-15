import type { IContact } from "../entities/Contact";
import { BaseCardsController } from "./BaseCardsController";

export class ContactCardsController extends BaseCardsController<
  IContact,
  HTMLDivElement
> {
  constructor() {
    super("#contact-cards", "contact_cards.json", "contacts");
  }

  protected setupListeners(): void {}

  protected render(): void {
    const contactsCards = this.elements
      .map(
        contact =>
          `
        <div>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              ${contact.path}
            </svg>

            <div>
              <h2>${contact.name}</h2>
              <p>${contact.description}</p>
            </div>

            <p>${contact.info}</p>
          </div>
        `
      )
      .join("");

    this.container.innerHTML = contactsCards;
  }
}
