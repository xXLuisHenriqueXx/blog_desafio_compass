import type { IContact } from "../entities/Contact";

export class ContactCardsController {
  private contacts: IContact[] = [];
  private contactsContainer: HTMLElement;

  constructor() {
    this.contactsContainer = document.querySelector(
      "#contact-cards"
    ) as HTMLElement;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadContacts();
    this.render();
  }

  private async loadContacts(): Promise<void> {
    try {
      const { contacts } = await fetch("../src/data/contact_cards.json").then(
        response => response.json()
      );
      this.contacts = contacts;
    } catch (error) {
      console.error("Erro ao carregar os serviços", error);
    }
  }

  private render(): void {
    const contactsCards = this.contacts
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

    this.contactsContainer.innerHTML = contactsCards;
  }
}
