import CategoryView from "./CategoryView";
import ProductVeiw from "./ProductVeiw";

document.addEventListener("DOMContentLoaded", () => {
  // category
  CategoryView;
  CategoryView.creatCategoriesList();

  // product
  ProductVeiw;
  ProductVeiw.setProducts();
  ProductVeiw.creatProductList();
});
