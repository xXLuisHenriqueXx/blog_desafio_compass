import type { ILink } from "../entities/Link";

export class FooterLinksController {
  private links: ILink[] = [];
  private linksContainer: HTMLUListElement;

  constructor() {
    this.linksContainer = document.querySelector(
      "#footer-links"
    ) as HTMLUListElement;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadLinks();
    this.render();
  }

  private async loadLinks(): Promise<void> {
    try {
      const { footerlinks } = await fetch("../src/data/footer_links.json").then(
        response => response.json()
      );
      this.links = footerlinks;
    } catch (error) {
      console.error("Erro ao carregar os serviços", error);
    }
  }

  private render(): void {
    const linksCards = this.links
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

    this.linksContainer.innerHTML = linksCards;
  }
}
