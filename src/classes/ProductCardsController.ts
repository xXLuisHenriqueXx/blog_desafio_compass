import type { Product } from "../entities/Product";

export class ProductCardsController {
  private products: Product[] = [];
  private currentFilter = "Random";
  private productsContainer: HTMLElement;
  private searchInput: HTMLInputElement;

  constructor() {
    this.productsContainer = document.querySelector(
      "#product-cards"
    ) as HTMLElement;
    this.searchInput = document.querySelector(
      "#search-shop"
    ) as HTMLInputElement;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadProducts();
    this.setupListeners();
    this.render();
  }

  private async loadProducts(): Promise<void> {
    try {
      const response = await fetch("../src/data/shop_products.json");
      const data = await response.json();
      this.products = data.products;
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
    }
  }

  private setupListeners(): void {
    const filterItems = document.querySelectorAll("nav ul li");
    for (const item of filterItems) {
      item.addEventListener("click", () => {
        this.currentFilter = item.textContent?.trim() || "Random";
        this.updateActiveFilter(item as HTMLElement);
        this.render();
      });
    }

    this.searchInput.addEventListener("input", () => {
      this.render();
    });
  }

  private updateActiveFilter(selectedItem: HTMLElement): void {
    const filterItems = document.querySelectorAll("nav ul li");
    for (const item of filterItems) {
      item.classList.remove("active");
    }
    selectedItem.classList.add("active");
  }

  private filterProducts(): Product[] {
    let filteredProducts = this.products;

    const searchValue = this.searchInput.value.trim().toLowerCase();
    if (searchValue) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchValue)
      );
    }

    if (this.currentFilter !== "Random") {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(this.currentFilter.toLowerCase())
      );
    }

    return filteredProducts;
  }

  private formatPrice(price: number): string {
    return `$${(price / 100).toFixed(2)}`;
  }

  private render(): void {
    const filteredProducts = this.filterProducts();
    const productsCards = filteredProducts
      .map(
        product =>
          `
        <div class="product-card">
          <img src="assets/${product.image}" alt="${product.name}">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>R$ ${this.formatPrice(product.price)}</p>
          </div>
        `
      )
      .join("");

    this.productsContainer.innerHTML = `${productsCards} <p>View More >>></p>`;
  }
}
