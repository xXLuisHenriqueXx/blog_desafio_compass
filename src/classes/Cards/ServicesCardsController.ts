import type { IService } from "../../entities/Service";
import { BaseCardsController } from "./BaseCardsController";

export class ServicesCardsController extends BaseCardsController<
  IService,
  HTMLElement
> {
  constructor() {
    super("#services-cards", "services_cards.json", "services");
  }

  protected setupListeners(): void {}

  protected render(): void {
    const servicesCards = this.elements
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

    this.container.innerHTML = servicesCards;
  }
}
