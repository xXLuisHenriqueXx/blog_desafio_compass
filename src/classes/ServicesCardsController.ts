import type { Service } from "../entities/Service";

export class ServicesCardsController {
  private services: Service[] = [];
  private servicesContainer: HTMLElement;

  constructor() {
    this.servicesContainer = document.querySelector(
      "#services-cards"
    ) as HTMLElement;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadServices();
    this.render();
  }

  private async loadServices(): Promise<void> {
    try {
      const { services } = await fetch("../src/data/services_cards.json").then(
        response => response.json()
      );
      this.services = services;
    } catch (error) {
      console.error("Erro ao carregar os serviços", error);
    }
  }

  private render(): void {
    const servicesCards = this.services
      .map(
        service =>
          `
        <div class=${service.name === "Adoption" ? "adopt" : ""}>
            <img src="./assets/${service.image}" alt="${service.name}" />
            <h2>${service.name}</h2>

            <div class="service-info">
                <div>
                    <h2>${service.name}</h2>
                    <p>${service.description}</p>
                </div>

                <button>Learn More</button>
            </div>
        </div>
        `
      )
      .join("");

    this.servicesContainer.innerHTML = servicesCards;
  }
}
