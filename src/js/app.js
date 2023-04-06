import CategoryView from "./CategoryView.js";
import ProductVeiw from "./ProductVeiw.js";

document.addEventListener("DOMContentLoaded", () => {
  // category
  CategoryView;
  CategoryView.creatCategoriesList();

  // product
  ProductVeiw;
  ProductVeiw.setProducts();
  ProductVeiw.creatProductList();
});


