import { Category } from "./CategoryView";
import { Product } from "./ProductVeiw";

export class Storage {
  // categories
  static getAllCategories(): Category[] {
    const savedCategories: Category[] =
      JSON.parse(localStorage.getItem("category") as string) || [];
    return savedCategories.sort((a: Category, b: Category) =>
      new Date(a.creatAt as string) > new Date(b.creatAt as string) ? -1 : 1
    );
  }

  static savedCategory(category: Category): void {
    const savedCategories = Storage.getAllCategories();
    const existedCategory = savedCategories.find(
      (c: Category) => c.id === category.id
    );

    if (existedCategory) {
      // update
      existedCategory.title = category.title;
      existedCategory.description = category.description;
      existedCategory.creatAt = new Date().toISOString();
    } else {
      // new
      category.id = `${new Date().getTime()}`;
      category.creatAt = new Date().toISOString();
      savedCategories.push(category);
    }

    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  // ------------------------------------------------

  // products

  static getAllProducts(): Product[] {
    const savedProducts: Product[] =
      JSON.parse(localStorage.getItem("product") as string) || [];

    return savedProducts.sort((a: Product, b: Product) =>
      new Date(a.creatAt as string) > new Date(b.creatAt as string) ? -1 : 1
    );
  }

  static savedProduct(product: Product): void {
    const savedProducts = Storage.getAllProducts();
    const existedProduct = savedProducts.find((c) => c.id === product.id);

    if (existedProduct) {
      // update
      existedProduct.title = product.title;
      existedProduct.category = product.category;
      existedProduct.quantity = product.quantity;
      existedProduct.creatAt = new Date().toISOString();
    } else {
      // new
      product.id = `${new Date().getTime()}`;
      product.creatAt = new Date().toISOString();
      savedProducts.push(product);
    }

    localStorage.setItem("product", JSON.stringify(savedProducts));
  }

  static deleteProduct(id: string): void {
    const savedProducts = Storage.getAllProducts();
    const filterdProducts = savedProducts.filter(
      (product: Product) => product.id !== id
    );
    localStorage.setItem("product", JSON.stringify(filterdProducts));
  }
}
