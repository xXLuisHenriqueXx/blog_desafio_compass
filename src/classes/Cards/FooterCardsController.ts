import type { ILink } from "../../entities/Link";
import { BaseCardsController } from "./BaseCardsController";

export class FooterCardsController extends BaseCardsController<
  ILink,
  HTMLUListElement
> {
  constructor() {
    super("#footer-links", "footer_links.json", "footerlinks");
  }

  protected setupListeners(): void {}

  protected render(): void {
    console;
    const linksCards = this.elements
      .map(link => {
        const subLinksHtml = link.links
          .map(subLinksObj =>
            Object.values(subLinksObj)
              .map(singleLink => `<li>${singleLink}</li>`)
              .join("")
          )
          .join("");
        return `
        <li>
            <a href="">${link.title}</a>
            <ul>
                ${subLinksHtml}
            </ul>
        </li>
      `;
      })
      .join("");

    this.container.innerHTML = linksCards;
  }
}
