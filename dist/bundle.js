(()=>{"use strict";var t={290:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(584),s=document.querySelector("#category-title"),a=document.querySelector("#category-description"),c=document.querySelector("#add-new-category-btn"),d=document.querySelector("#cansel-btn"),l=document.querySelector("#category-form"),i=document.querySelector("#add-new-category-toggle");e.default=new class{constructor(){c.addEventListener("click",(t=>this.addNewCategory(t))),d.addEventListener("click",(t=>this.cancelAddNewCategory(t))),i.addEventListener("click",(t=>this.categoryToggle()))}addNewCategory(t){const e=s.value.trim(),r=a.value.trim();e&&r&&(o.Storage.savedCategory({title:e,description:r}),s.value="",a.value="",this.creatCategoriesList(),this.categoryToggle())}creatCategoriesList(){const t=o.Storage.getAllCategories(),e=document.querySelector("#product-category"),r=document.querySelector("#product-category-modal");let s='<option class="bg-slate-500 text-slate-200" value="" selected>select a category</option>';t.forEach((t=>{s+=`<option class="bg-slate-500 text-slate-200" value="${t.id}">${t.title}</option>`})),e.innerHTML=s,r.innerHTML=s}cancelAddNewCategory(t){s.value="",a.value="",this.categoryToggle()}categoryToggle(){i.classList.toggle("hidden"),l.classList.toggle("hidden")}}},974:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(584),s=document.querySelector("#add-new-product-btn"),a=document.querySelector("#product-title"),c=document.querySelector("#product-quantity"),d=document.querySelector("#product-category"),l=document.querySelector("#search"),i=document.querySelector("#sort"),n=document.querySelector("#modal"),u=document.querySelector("#modal-back-dray"),g=document.querySelector("#update-product-modal-btn"),y=document.querySelector("#cancel-modal-btn"),p=document.querySelector("#product-title-modal"),m=document.querySelector("#product-quantity-modal"),h=document.querySelector("#product-category-modal"),v=document.querySelector("#badge"),S=document.querySelector(".product-list"),f=document.querySelector(".products-list-box");e.default=new class{constructor(){this.products=[],s.addEventListener("click",(t=>this.addNewProduct(t))),l.addEventListener("input",(t=>this.searchProducts(t))),i.addEventListener("change",(t=>this.sortProducts(t))),u.addEventListener("click",(t=>this.closeEditModal())),g.addEventListener("click",(t=>this.editProduct(t))),y.addEventListener("click",(t=>this.closeEditModal()))}addNewProduct(t){const e=a.value.trim(),r=+c.value.trim(),s=d.value;e&&r&&0!==r&&s&&(o.Storage.savedProduct({title:e,quantity:r,category:s}),a.value="",c.value="",d.value="",this.products=o.Storage.getAllProducts(),this.creatProductList())}setProducts(){this.products=o.Storage.getAllProducts()}creatProductList(){let t="";this.products.forEach((e=>{const r=o.Storage.getAllCategories().find((t=>t.id===e.category));t+=`<div class="flex justify-between">\n            <div class="">\n                <span class="text-slate-300 font-bold">${e.title}</span>\n            </div>\n            <div class="flex items-center space-x-2">\n                <span class="text-slate-400 text-xs sm:text-sm">${new Date(e.creatAt).toLocaleDateString("fa-IR")}</span>\n                <span class="text-slate-600 text-xs sm:text-sm border border-slate-600 rounded-xl px-2 py-.5">${null==r?void 0:r.title}</span>\n                <span class="bg-slate-500 text-slate-300 text-xs sm:text-sm w-5 sm:w-7 h-5 sm:h-7 flex items-center justify-center border-2 border-slate-300 rounded-full">${e.quantity}</span>\n                <button class="text-slate-400 text-xs sm:text-sm" id="delete-btn" data-product-id="${e.id}">delete</button>\n                <button class="text-slate-300 text-xs sm:text-sm" id="edit-btn" data-product-id="${e.id}">edit</button>\n            </div>\n        </div>`})),S.innerHTML=t,0===o.Storage.getAllProducts().length?f.classList.add("hidden"):f.classList.remove("hidden"),document.querySelectorAll("#delete-btn").forEach((t=>{t.addEventListener("click",(t=>this.deleteProduct(t)))})),document.querySelectorAll("#edit-btn").forEach((t=>{t.addEventListener("click",(t=>this.showEditModal(t)))})),this.setHeadingQuantityProduct()}searchProducts(t){const e=t.target.value,r=o.Storage.getAllProducts().filter((t=>t.title.toLowerCase().includes(e.toLowerCase().trim())));this.products=r,this.creatProductList()}sortProducts(t){const e=t.target.value;"newest"===e?this.products=this.products.sort(((t,e)=>new Date(t.creatAt)>new Date(e.creatAt)?-1:1)):"oldest"===e&&(this.products=this.products.sort(((t,e)=>new Date(t.creatAt)>new Date(e.creatAt)?1:-1))),this.creatProductList()}deleteProduct(t){const e=t.target.dataset.productId;o.Storage.deleteProduct(e),this.setProducts(),this.creatProductList()}showEditModal(t){const e=t.target.dataset.productId;n.classList.remove("-top-full"),n.classList.add("top-1/4"),u.classList.remove("hidden"),this.setProductEdit(e)}closeEditModal(){n.classList.remove("top-1/4"),n.classList.add("-top-full"),u.classList.add("hidden")}setProductEdit(t){g.dataset.productId=t;const e=this.products.find((e=>e.id===t));e&&(p.value=e.title,m.value=`${e.quantity}`,h.value=e.category)}editProduct(t){const e=t.target.dataset.productId,r=p.value.trim(),s=+m.value.trim(),a=h.value;r&&s&&0!==s&&a&&(o.Storage.savedProduct({id:e,title:r,quantity:s,category:a}),this.products=o.Storage.getAllProducts(),this.creatProductList(),this.closeEditModal())}setHeadingQuantityProduct(){if(this.products.length>0){v.classList.remove("hidden");const t=this.products.reduce(((t,e)=>t+e.quantity),0);v.innerText=`${t}`}else v.classList.add("hidden")}}},584:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Storage=void 0;class r{static getAllCategories(){return(JSON.parse(localStorage.getItem("category"))||[]).sort(((t,e)=>new Date(t.creatAt)>new Date(e.creatAt)?-1:1))}static savedCategory(t){const e=r.getAllCategories(),o=e.find((e=>e.id===t.id));o?(o.title=t.title,o.description=t.description,o.creatAt=(new Date).toISOString()):(t.id=`${(new Date).getTime()}`,t.creatAt=(new Date).toISOString(),e.push(t)),localStorage.setItem("category",JSON.stringify(e))}static getAllProducts(){return(JSON.parse(localStorage.getItem("product"))||[]).sort(((t,e)=>new Date(t.creatAt)>new Date(e.creatAt)?-1:1))}static savedProduct(t){const e=r.getAllProducts(),o=e.find((e=>e.id===t.id));o?(o.title=t.title,o.category=t.category,o.quantity=t.quantity,o.creatAt=(new Date).toISOString()):(t.id=`${(new Date).getTime()}`,t.creatAt=(new Date).toISOString(),e.push(t)),localStorage.setItem("product",JSON.stringify(e))}static deleteProduct(t){const e=r.getAllProducts().filter((e=>e.id!==t));localStorage.setItem("product",JSON.stringify(e))}}e.Storage=r},866:function(t,e,r){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=o(r(290)),a=o(r(974));document.addEventListener("DOMContentLoaded",(()=>{s.default,s.default.creatCategoriesList(),a.default,a.default.setProducts(),a.default.creatProductList()}))}},e={};!function r(o){var s=e[o];if(void 0!==s)return s.exports;var a=e[o]={exports:{}};return t[o].call(a.exports,a,a.exports,r),a.exports}(866)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQixvQkFBb0IsS0FFNUMsVUFDQSxVQUFhWSxzQkFHYixVQUNBLFVBQVlvQyxjQUNaLFVBQVlELGtCQUFrQixHLEdDVjVCNkMsRUFBMkIsQ0FBQyxHQUdoQyxTQUFTQyxFQUFvQkMsR0FFNUIsSUFBSUMsRUFBZUgsRUFBeUJFLEdBQzVDLFFBQXFCRSxJQUFqQkQsRUFDSCxPQUFPQSxFQUFhRSxRQUdyQixJQUFJQyxFQUFTTixFQUF5QkUsR0FBWSxDQUdqREcsUUFBUyxDQUFDLEdBT1gsT0FIQUUsRUFBb0JMLEdBQVVNLEtBQUtGLEVBQU9ELFFBQVNDLEVBQVFBLEVBQU9ELFFBQVNKLEdBR3BFSyxFQUFPRCxPQUNmLENDbkIwQkosQ0FBb0IsSSIsInNvdXJjZXMiOlsid2VicGFjazovLzEwLWludmVudG9yeWFwcC8uL3NyYy90cy9DYXRlZ29yeVZpZXcudHMiLCJ3ZWJwYWNrOi8vMTAtaW52ZW50b3J5YXBwLy4vc3JjL3RzL1Byb2R1Y3RWZWl3LnRzIiwid2VicGFjazovLzEwLWludmVudG9yeWFwcC8uL3NyYy90cy9TdG9yYWdlLnRzIiwid2VicGFjazovLzEwLWludmVudG9yeWFwcC8uL3NyYy90cy9hcHAudHMiLCJ3ZWJwYWNrOi8vMTAtaW52ZW50b3J5YXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzEwLWludmVudG9yeWFwcC93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL1N0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2F0ZWdvcnkge1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjcmVhdEF0Pzogc3RyaW5nO1xyXG59XHJcblxyXG4vLyAxLiBhZGQgbmV3IGNhdGVnb3J5XHJcbi8vIDIuIGNyZWF0IERPTSBjYXRlZ29yeVxyXG4vLyAzLiBjYW5jZWwgbmV3IGNhdGVnb3J5XHJcblxyXG5jb25zdCBjYXRlZ29yeVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNjYXRlZ29yeS10aXRsZVwiXHJcbikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuY29uc3QgY2F0ZWdvcnlEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjY2F0ZWdvcnktZGVzY3JpcHRpb25cIlxyXG4pIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbmNvbnN0IGFkZE5ld0NhdGVnb3J5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNhZGQtbmV3LWNhdGVnb3J5LWJ0blwiXHJcbikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IGNhbnNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2Fuc2VsLWJ0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbmNvbnN0IGNhdGVnb3J5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2F0ZWdvcnktZm9ybVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuY29uc3QgYWRkTmV3Q2F0ZWdvcnlUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI2FkZC1uZXctY2F0ZWdvcnktdG9nZ2xlXCJcclxuKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbmNsYXNzIENhdGVnb3J5VmlldyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBhZGROZXdDYXRlZ29yeUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuYWRkTmV3Q2F0ZWdvcnkoZSkpO1xyXG4gICAgY2Fuc2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5jYW5jZWxBZGROZXdDYXRlZ29yeShlKSk7XHJcbiAgICBhZGROZXdDYXRlZ29yeVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlUb2dnbGUoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFkZE5ld0NhdGVnb3J5KGU6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0aXRsZSA9IGNhdGVnb3J5VGl0bGUudmFsdWUudHJpbSgpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjYXRlZ29yeURlc2NyaXB0aW9uLnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICBpZiAoIXRpdGxlIHx8ICFkZXNjcmlwdGlvbikgcmV0dXJuO1xyXG5cclxuICAgIFN0b3JhZ2Uuc2F2ZWRDYXRlZ29yeSh7IHRpdGxlLCBkZXNjcmlwdGlvbiB9KTtcclxuXHJcbiAgICBjYXRlZ29yeVRpdGxlLnZhbHVlID0gXCJcIjtcclxuICAgIGNhdGVnb3J5RGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xyXG5cclxuICAgIHRoaXMuY3JlYXRDYXRlZ29yaWVzTGlzdCgpO1xyXG4gICAgdGhpcy5jYXRlZ29yeVRvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRDYXRlZ29yaWVzTGlzdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNhdmVkQ2F0ZWdvcmllcyA9IFN0b3JhZ2UuZ2V0QWxsQ2F0ZWdvcmllcygpO1xyXG4gICAgY29uc3QgcHJvZHVjdENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjcHJvZHVjdC1jYXRlZ29yeVwiXHJcbiAgICApIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3QgcHJvZHVjdENhdGVnb3J5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNwcm9kdWN0LWNhdGVnb3J5LW1vZGFsXCJcclxuICAgICkgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGA8b3B0aW9uIGNsYXNzPVwiYmctc2xhdGUtNTAwIHRleHQtc2xhdGUtMjAwXCIgdmFsdWU9XCJcIiBzZWxlY3RlZD5zZWxlY3QgYSBjYXRlZ29yeTwvb3B0aW9uPmA7XHJcblxyXG4gICAgc2F2ZWRDYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5OiBDYXRlZ29yeSkgPT4ge1xyXG4gICAgICByZXN1bHQgKz0gYDxvcHRpb24gY2xhc3M9XCJiZy1zbGF0ZS01MDAgdGV4dC1zbGF0ZS0yMDBcIiB2YWx1ZT1cIiR7Y2F0ZWdvcnkuaWR9XCI+JHtjYXRlZ29yeS50aXRsZX08L29wdGlvbj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcHJvZHVjdENhdGVnb3J5LmlubmVySFRNTCA9IHJlc3VsdDtcclxuICAgIHByb2R1Y3RDYXRlZ29yeU1vZGFsLmlubmVySFRNTCA9IHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGNhbmNlbEFkZE5ld0NhdGVnb3J5KGU6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjYXRlZ29yeVRpdGxlLnZhbHVlID0gXCJcIjtcclxuICAgIGNhdGVnb3J5RGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5jYXRlZ29yeVRvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgY2F0ZWdvcnlUb2dnbGUoKTogdm9pZCB7XHJcbiAgICBhZGROZXdDYXRlZ29yeVRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xyXG4gICAgY2F0ZWdvcnlGb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ2F0ZWdvcnlWaWV3KCk7XHJcbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9TdG9yYWdlXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlWaWV3XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3Qge1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY2F0ZWdvcnk6IHN0cmluZztcclxuICBxdWFudGl0eTogbnVtYmVyO1xyXG4gIGNyZWF0QXQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIDEuIGFkZCBuZXcgcHJvZHVjdFxyXG4vLyAyLiBjcmVhdCBET00gcHJvZHVjc1xyXG4vLyAzLiBkZWxldGVcclxuLy8gNC4gZWRpdFxyXG4vLyA1LiBzZWFyY2hcclxuLy8gNi4gc29ydFxyXG5cclxuY29uc3QgYWRkTmV3UHJvZHVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjYWRkLW5ldy1wcm9kdWN0LWJ0blwiXHJcbikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG5jb25zdCBwcm9kdWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI3Byb2R1Y3QtdGl0bGVcIlxyXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmNvbnN0IHByb2R1Y3RRdWFudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjcHJvZHVjdC1xdWFudGl0eVwiXHJcbikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuY29uc3QgcHJvZHVjdENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNwcm9kdWN0LWNhdGVnb3J5XCJcclxuKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5jb25zdCBzb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzb3J0XCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5jb25zdCBtb2RhbEJhY2tEcmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNtb2RhbC1iYWNrLWRyYXlcIlxyXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5jb25zdCB1cGRhdGVQcm9kdWN0TW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI3VwZGF0ZS1wcm9kdWN0LW1vZGFsLWJ0blwiXHJcbikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IGNhbmNlbE1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNjYW5jZWwtbW9kYWwtYnRuXCJcclxuKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbmNvbnN0IHByb2R1Y3RUaXRsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICBcIiNwcm9kdWN0LXRpdGxlLW1vZGFsXCJcclxuKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5jb25zdCBwcm9kdWN0UXVhbnRpdHlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjcHJvZHVjdC1xdWFudGl0eS1tb2RhbFwiXHJcbikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuY29uc3QgcHJvZHVjdENhdGVnb3J5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI3Byb2R1Y3QtY2F0ZWdvcnktbW9kYWxcIlxyXG4pIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuY29uc3QgaGVhZGluZ1F1YW50aXR5UHJvZHVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjYmFkZ2VcIlxyXG4pIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuY29uc3QgcHJvZHVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2R1Y3QtbGlzdFwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuY29uc3QgcHJvZHVjdExpc3RCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLnByb2R1Y3RzLWxpc3QtYm94XCJcclxuKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcbmNsYXNzIFByb2R1Y3RWaWV3IHtcclxuICBwcm9kdWN0czogUHJvZHVjdFtdID0gW107XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBhZGROZXdQcm9kdWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5hZGROZXdQcm9kdWN0KGUpKTtcclxuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4gdGhpcy5zZWFyY2hQcm9kdWN0cyhlKSk7XHJcbiAgICBzb3J0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHRoaXMuc29ydFByb2R1Y3RzKGUpKTtcclxuXHJcbiAgICBtb2RhbEJhY2tEcmF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5jbG9zZUVkaXRNb2RhbCgpKTtcclxuICAgIHVwZGF0ZVByb2R1Y3RNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuZWRpdFByb2R1Y3QoZSkpO1xyXG4gICAgY2FuY2VsTW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmNsb3NlRWRpdE1vZGFsKCkpO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV3UHJvZHVjdChlOiBFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGl0bGUgPSBwcm9kdWN0VGl0bGUudmFsdWUudHJpbSgpO1xyXG4gICAgY29uc3QgcXVhbnRpdHkgPSArcHJvZHVjdFF1YW50aXR5LnZhbHVlLnRyaW0oKTtcclxuICAgIGNvbnN0IGNhdGVnb3J5ID0gcHJvZHVjdENhdGVnb3J5LnZhbHVlO1xyXG5cclxuICAgIGlmICghdGl0bGUgfHwgIXF1YW50aXR5IHx8IHF1YW50aXR5ID09PSAwIHx8ICFjYXRlZ29yeSkgcmV0dXJuO1xyXG5cclxuICAgIFN0b3JhZ2Uuc2F2ZWRQcm9kdWN0KHsgdGl0bGUsIHF1YW50aXR5LCBjYXRlZ29yeSB9KTtcclxuXHJcbiAgICBwcm9kdWN0VGl0bGUudmFsdWUgPSBcIlwiO1xyXG4gICAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gXCJcIjtcclxuICAgIHByb2R1Y3RDYXRlZ29yeS52YWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0cyA9IFN0b3JhZ2UuZ2V0QWxsUHJvZHVjdHMoKTtcclxuICAgIHRoaXMuY3JlYXRQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJvZHVjdHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnByb2R1Y3RzID0gU3RvcmFnZS5nZXRBbGxQcm9kdWN0cygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRQcm9kdWN0TGlzdCgpOiB2b2lkIHtcclxuICAgIGxldCByZXN1bHQgPSBgYDtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcclxuICAgICAgY29uc3QgY2F0ZWdvcnkgPSBTdG9yYWdlLmdldEFsbENhdGVnb3JpZXMoKS5maW5kKFxyXG4gICAgICAgIChjOiBDYXRlZ29yeSkgPT4gYy5pZCA9PT0gcHJvZHVjdC5jYXRlZ29yeVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmVzdWx0ICs9IGA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LWJvbGRcIj4ke3Byb2R1Y3QudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzIHNtOnRleHQtc21cIj4ke25ldyBEYXRlKFxyXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0LmNyZWF0QXQgYXMgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlRGF0ZVN0cmluZyhcImZhLUlSXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1zbGF0ZS02MDAgdGV4dC14cyBzbTp0ZXh0LXNtIGJvcmRlciBib3JkZXItc2xhdGUtNjAwIHJvdW5kZWQteGwgcHgtMiBweS0uNVwiPiR7XHJcbiAgICAgICAgICAgICAgICAgIGNhdGVnb3J5Py50aXRsZVxyXG4gICAgICAgICAgICAgICAgfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmctc2xhdGUtNTAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgc206dGV4dC1zbSB3LTUgc206dy03IGgtNSBzbTpoLTcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTMwMCByb3VuZGVkLWZ1bGxcIj4ke1xyXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0LnF1YW50aXR5XHJcbiAgICAgICAgICAgICAgICB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRleHQtc2xhdGUtNDAwIHRleHQteHMgc206dGV4dC1zbVwiIGlkPVwiZGVsZXRlLWJ0blwiIGRhdGEtcHJvZHVjdC1pZD1cIiR7XHJcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3QuaWRcclxuICAgICAgICAgICAgICAgIH1cIj5kZWxldGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0ZXh0LXNsYXRlLTMwMCB0ZXh0LXhzIHNtOnRleHQtc21cIiBpZD1cImVkaXQtYnRuXCIgZGF0YS1wcm9kdWN0LWlkPVwiJHtcclxuICAgICAgICAgICAgICAgICAgcHJvZHVjdC5pZFxyXG4gICAgICAgICAgICAgICAgfVwiPmVkaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH0pO1xyXG5cclxuICAgIHByb2R1Y3RMaXN0LmlubmVySFRNTCA9IHJlc3VsdDtcclxuXHJcbiAgICBpZiAoU3RvcmFnZS5nZXRBbGxQcm9kdWN0cygpLmxlbmd0aCA9PT0gMClcclxuICAgICAgcHJvZHVjdExpc3RCb3guY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIGVsc2UgcHJvZHVjdExpc3RCb3guY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHJcbiAgICBjb25zdCBkZWxldGVQcm9kdWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkZWxldGUtYnRuXCIpO1xyXG4gICAgZGVsZXRlUHJvZHVjdEJ0bi5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5kZWxldGVQcm9kdWN0KGUpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGVkaXRQcm9kdWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNlZGl0LWJ0blwiKTtcclxuICAgIGVkaXRQcm9kdWN0QnRuLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLnNob3dFZGl0TW9kYWwoZSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXRIZWFkaW5nUXVhbnRpdHlQcm9kdWN0KCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hQcm9kdWN0cyhlOiBFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VhcmNoVmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICBjb25zdCBzYXZlZFByb2R1Y3RzID0gU3RvcmFnZS5nZXRBbGxQcm9kdWN0cygpO1xyXG5cclxuICAgIGNvbnN0IGZpbHRlcmRQcm9kdWN0cyA9IHNhdmVkUHJvZHVjdHMuZmlsdGVyKChwcm9kdWN0OiBQcm9kdWN0KSA9PlxyXG4gICAgICBwcm9kdWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCkpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHMgPSBmaWx0ZXJkUHJvZHVjdHM7XHJcblxyXG4gICAgdGhpcy5jcmVhdFByb2R1Y3RMaXN0KCk7XHJcbiAgfVxyXG5cclxuICBzb3J0UHJvZHVjdHMoZTogRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNvcnRWYWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWU7XHJcblxyXG4gICAgaWYgKHNvcnRWYWx1ZSA9PT0gXCJuZXdlc3RcIikge1xyXG4gICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5wcm9kdWN0cy5zb3J0KChhOiBQcm9kdWN0LCBiOiBQcm9kdWN0KSA9PlxyXG4gICAgICAgIG5ldyBEYXRlKGEuY3JlYXRBdCBhcyBzdHJpbmcpID4gbmV3IERhdGUoYi5jcmVhdEF0IGFzIHN0cmluZykgPyAtMSA6IDFcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoc29ydFZhbHVlID09PSBcIm9sZGVzdFwiKSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzLnNvcnQoKGE6IFByb2R1Y3QsIGI6IFByb2R1Y3QpID0+XHJcbiAgICAgICAgbmV3IERhdGUoYS5jcmVhdEF0IGFzIHN0cmluZykgPiBuZXcgRGF0ZShiLmNyZWF0QXQgYXMgc3RyaW5nKSA/IDEgOiAtMVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlYXRQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlUHJvZHVjdChlOiBFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWQgPSAoZS50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmRhdGFzZXQucHJvZHVjdElkIGFzIHN0cmluZztcclxuXHJcbiAgICBTdG9yYWdlLmRlbGV0ZVByb2R1Y3QoaWQpO1xyXG4gICAgdGhpcy5zZXRQcm9kdWN0cygpO1xyXG4gICAgdGhpcy5jcmVhdFByb2R1Y3RMaXN0KCk7XHJcbiAgfVxyXG5cclxuICBzaG93RWRpdE1vZGFsKGU6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpZCA9IChlLnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZGF0YXNldC5wcm9kdWN0SWQgYXMgc3RyaW5nO1xyXG5cclxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCItdG9wLWZ1bGxcIik7XHJcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwidG9wLTEvNFwiKTtcclxuICAgIG1vZGFsQmFja0RyYXkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHJcbiAgICB0aGlzLnNldFByb2R1Y3RFZGl0KGlkKTtcclxuICB9XHJcblxyXG4gIGNsb3NlRWRpdE1vZGFsKCk6IHZvaWQge1xyXG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInRvcC0xLzRcIik7XHJcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiLXRvcC1mdWxsXCIpO1xyXG5cclxuICAgIG1vZGFsQmFja0RyYXkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIHNldFByb2R1Y3RFZGl0KGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHVwZGF0ZVByb2R1Y3RNb2RhbEJ0bi5kYXRhc2V0LnByb2R1Y3RJZCA9IGlkO1xyXG5cclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzLmZpbmQoKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHByb2R1Y3QuaWQgPT09IGlkKTtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgIHByb2R1Y3RUaXRsZU1vZGFsLnZhbHVlID0gcHJvZHVjdC50aXRsZTtcclxuICAgICAgcHJvZHVjdFF1YW50aXR5TW9kYWwudmFsdWUgPSBgJHtwcm9kdWN0LnF1YW50aXR5fWA7XHJcbiAgICAgIHByb2R1Y3RDYXRlZ29yeU1vZGFsLnZhbHVlID0gcHJvZHVjdC5jYXRlZ29yeTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRQcm9kdWN0KGU6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpZCA9IChlLnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZGF0YXNldC5wcm9kdWN0SWQgYXMgc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gcHJvZHVjdFRpdGxlTW9kYWwudmFsdWUudHJpbSgpO1xyXG4gICAgY29uc3QgcXVhbnRpdHkgPSArcHJvZHVjdFF1YW50aXR5TW9kYWwudmFsdWUudHJpbSgpO1xyXG4gICAgY29uc3QgY2F0ZWdvcnkgPSBwcm9kdWN0Q2F0ZWdvcnlNb2RhbC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXRpdGxlIHx8ICFxdWFudGl0eSB8fCBxdWFudGl0eSA9PT0gMCB8fCAhY2F0ZWdvcnkpIHJldHVybjtcclxuXHJcbiAgICBTdG9yYWdlLnNhdmVkUHJvZHVjdCh7IGlkLCB0aXRsZSwgcXVhbnRpdHksIGNhdGVnb3J5IH0pO1xyXG4gICAgdGhpcy5wcm9kdWN0cyA9IFN0b3JhZ2UuZ2V0QWxsUHJvZHVjdHMoKTtcclxuICAgIHRoaXMuY3JlYXRQcm9kdWN0TGlzdCgpO1xyXG5cclxuICAgIHRoaXMuY2xvc2VFZGl0TW9kYWwoKTtcclxuICB9XHJcblxyXG4gIHNldEhlYWRpbmdRdWFudGl0eVByb2R1Y3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGhlYWRpbmdRdWFudGl0eVByb2R1Y3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgY29uc3QgcXVhbnRpdHlQcm9kY3V0ID0gdGhpcy5wcm9kdWN0cy5yZWR1Y2UoXHJcbiAgICAgICAgKGFjY3UsIGN1cnI6IFByb2R1Y3QpID0+IGFjY3UgKyBjdXJyLnF1YW50aXR5LFxyXG4gICAgICAgIDBcclxuICAgICAgKTtcclxuICAgICAgaGVhZGluZ1F1YW50aXR5UHJvZHVjdC5pbm5lclRleHQgPSBgJHtxdWFudGl0eVByb2RjdXR9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlYWRpbmdRdWFudGl0eVByb2R1Y3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBQcm9kdWN0VmlldygpO1xyXG4iLCJpbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5Vmlld1wiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFZlaXdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcclxuICAvLyBjYXRlZ29yaWVzXHJcbiAgc3RhdGljIGdldEFsbENhdGVnb3JpZXMoKTogQ2F0ZWdvcnlbXSB7XHJcbiAgICBjb25zdCBzYXZlZENhdGVnb3JpZXM6IENhdGVnb3J5W10gPVxyXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2F0ZWdvcnlcIikgYXMgc3RyaW5nKSB8fCBbXTtcclxuICAgIHJldHVybiBzYXZlZENhdGVnb3JpZXMuc29ydCgoYTogQ2F0ZWdvcnksIGI6IENhdGVnb3J5KSA9PlxyXG4gICAgICBuZXcgRGF0ZShhLmNyZWF0QXQgYXMgc3RyaW5nKSA+IG5ldyBEYXRlKGIuY3JlYXRBdCBhcyBzdHJpbmcpID8gLTEgOiAxXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNhdmVkQ2F0ZWdvcnkoY2F0ZWdvcnk6IENhdGVnb3J5KTogdm9pZCB7XHJcbiAgICBjb25zdCBzYXZlZENhdGVnb3JpZXMgPSBTdG9yYWdlLmdldEFsbENhdGVnb3JpZXMoKTtcclxuICAgIGNvbnN0IGV4aXN0ZWRDYXRlZ29yeSA9IHNhdmVkQ2F0ZWdvcmllcy5maW5kKFxyXG4gICAgICAoYzogQ2F0ZWdvcnkpID0+IGMuaWQgPT09IGNhdGVnb3J5LmlkXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChleGlzdGVkQ2F0ZWdvcnkpIHtcclxuICAgICAgLy8gdXBkYXRlXHJcbiAgICAgIGV4aXN0ZWRDYXRlZ29yeS50aXRsZSA9IGNhdGVnb3J5LnRpdGxlO1xyXG4gICAgICBleGlzdGVkQ2F0ZWdvcnkuZGVzY3JpcHRpb24gPSBjYXRlZ29yeS5kZXNjcmlwdGlvbjtcclxuICAgICAgZXhpc3RlZENhdGVnb3J5LmNyZWF0QXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBuZXdcclxuICAgICAgY2F0ZWdvcnkuaWQgPSBgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xyXG4gICAgICBjYXRlZ29yeS5jcmVhdEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICBzYXZlZENhdGVnb3JpZXMucHVzaChjYXRlZ29yeSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXRlZ29yeVwiLCBKU09OLnN0cmluZ2lmeShzYXZlZENhdGVnb3JpZXMpKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvLyBwcm9kdWN0c1xyXG5cclxuICBzdGF0aWMgZ2V0QWxsUHJvZHVjdHMoKTogUHJvZHVjdFtdIHtcclxuICAgIGNvbnN0IHNhdmVkUHJvZHVjdHM6IFByb2R1Y3RbXSA9XHJcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9kdWN0XCIpIGFzIHN0cmluZykgfHwgW107XHJcblxyXG4gICAgcmV0dXJuIHNhdmVkUHJvZHVjdHMuc29ydCgoYTogUHJvZHVjdCwgYjogUHJvZHVjdCkgPT5cclxuICAgICAgbmV3IERhdGUoYS5jcmVhdEF0IGFzIHN0cmluZykgPiBuZXcgRGF0ZShiLmNyZWF0QXQgYXMgc3RyaW5nKSA/IC0xIDogMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzYXZlZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2F2ZWRQcm9kdWN0cyA9IFN0b3JhZ2UuZ2V0QWxsUHJvZHVjdHMoKTtcclxuICAgIGNvbnN0IGV4aXN0ZWRQcm9kdWN0ID0gc2F2ZWRQcm9kdWN0cy5maW5kKChjKSA9PiBjLmlkID09PSBwcm9kdWN0LmlkKTtcclxuXHJcbiAgICBpZiAoZXhpc3RlZFByb2R1Y3QpIHtcclxuICAgICAgLy8gdXBkYXRlXHJcbiAgICAgIGV4aXN0ZWRQcm9kdWN0LnRpdGxlID0gcHJvZHVjdC50aXRsZTtcclxuICAgICAgZXhpc3RlZFByb2R1Y3QuY2F0ZWdvcnkgPSBwcm9kdWN0LmNhdGVnb3J5O1xyXG4gICAgICBleGlzdGVkUHJvZHVjdC5xdWFudGl0eSA9IHByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgIGV4aXN0ZWRQcm9kdWN0LmNyZWF0QXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBuZXdcclxuICAgICAgcHJvZHVjdC5pZCA9IGAke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XHJcbiAgICAgIHByb2R1Y3QuY3JlYXRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgICAgc2F2ZWRQcm9kdWN0cy5wdXNoKHByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvZHVjdFwiLCBKU09OLnN0cmluZ2lmeShzYXZlZFByb2R1Y3RzKSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGVsZXRlUHJvZHVjdChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBzYXZlZFByb2R1Y3RzID0gU3RvcmFnZS5nZXRBbGxQcm9kdWN0cygpO1xyXG4gICAgY29uc3QgZmlsdGVyZFByb2R1Y3RzID0gc2F2ZWRQcm9kdWN0cy5maWx0ZXIoXHJcbiAgICAgIChwcm9kdWN0OiBQcm9kdWN0KSA9PiBwcm9kdWN0LmlkICE9PSBpZFxyXG4gICAgKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvZHVjdFwiLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJkUHJvZHVjdHMpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IENhdGVnb3J5VmlldyBmcm9tIFwiLi9DYXRlZ29yeVZpZXdcIjtcclxuaW1wb3J0IFByb2R1Y3RWZWl3IGZyb20gXCIuL1Byb2R1Y3RWZWl3XCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgLy8gY2F0ZWdvcnlcclxuICBDYXRlZ29yeVZpZXc7XHJcbiAgQ2F0ZWdvcnlWaWV3LmNyZWF0Q2F0ZWdvcmllc0xpc3QoKTtcclxuXHJcbiAgLy8gcHJvZHVjdFxyXG4gIFByb2R1Y3RWZWl3O1xyXG4gIFByb2R1Y3RWZWl3LnNldFByb2R1Y3RzKCk7XHJcbiAgUHJvZHVjdFZlaXcuY3JlYXRQcm9kdWN0TGlzdCgpO1xyXG59KTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NjYpO1xuIl0sIm5hbWVzIjpbImNhdGVnb3J5VGl0bGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYXRlZ29yeURlc2NyaXB0aW9uIiwiYWRkTmV3Q2F0ZWdvcnlCdG4iLCJjYW5zZWxCdG4iLCJjYXRlZ29yeUZvcm0iLCJhZGROZXdDYXRlZ29yeVRvZ2dsZSIsImNvbnN0cnVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0aGlzIiwiYWRkTmV3Q2F0ZWdvcnkiLCJjYW5jZWxBZGROZXdDYXRlZ29yeSIsImNhdGVnb3J5VG9nZ2xlIiwidGl0bGUiLCJ2YWx1ZSIsInRyaW0iLCJkZXNjcmlwdGlvbiIsIlN0b3JhZ2UiLCJzYXZlZENhdGVnb3J5IiwiY3JlYXRDYXRlZ29yaWVzTGlzdCIsInNhdmVkQ2F0ZWdvcmllcyIsImdldEFsbENhdGVnb3JpZXMiLCJwcm9kdWN0Q2F0ZWdvcnkiLCJwcm9kdWN0Q2F0ZWdvcnlNb2RhbCIsInJlc3VsdCIsImZvckVhY2giLCJjYXRlZ29yeSIsImlkIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiYWRkTmV3UHJvZHVjdEJ0biIsInByb2R1Y3RUaXRsZSIsInByb2R1Y3RRdWFudGl0eSIsInNlYXJjaElucHV0Iiwic29ydCIsIm1vZGFsIiwibW9kYWxCYWNrRHJheSIsInVwZGF0ZVByb2R1Y3RNb2RhbEJ0biIsImNhbmNlbE1vZGFsQnRuIiwicHJvZHVjdFRpdGxlTW9kYWwiLCJwcm9kdWN0UXVhbnRpdHlNb2RhbCIsImhlYWRpbmdRdWFudGl0eVByb2R1Y3QiLCJwcm9kdWN0TGlzdCIsInByb2R1Y3RMaXN0Qm94IiwicHJvZHVjdHMiLCJhZGROZXdQcm9kdWN0Iiwic2VhcmNoUHJvZHVjdHMiLCJzb3J0UHJvZHVjdHMiLCJjbG9zZUVkaXRNb2RhbCIsImVkaXRQcm9kdWN0IiwicXVhbnRpdHkiLCJzYXZlZFByb2R1Y3QiLCJnZXRBbGxQcm9kdWN0cyIsImNyZWF0UHJvZHVjdExpc3QiLCJzZXRQcm9kdWN0cyIsInByb2R1Y3QiLCJmaW5kIiwiYyIsIkRhdGUiLCJjcmVhdEF0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibGVuZ3RoIiwiYWRkIiwicmVtb3ZlIiwicXVlcnlTZWxlY3RvckFsbCIsImJ0biIsImRlbGV0ZVByb2R1Y3QiLCJzaG93RWRpdE1vZGFsIiwic2V0SGVhZGluZ1F1YW50aXR5UHJvZHVjdCIsInNlYXJjaFZhbHVlIiwidGFyZ2V0IiwiZmlsdGVyZFByb2R1Y3RzIiwiZmlsdGVyIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInNvcnRWYWx1ZSIsImEiLCJiIiwiZGF0YXNldCIsInByb2R1Y3RJZCIsInNldFByb2R1Y3RFZGl0IiwicXVhbnRpdHlQcm9kY3V0IiwicmVkdWNlIiwiYWNjdSIsImN1cnIiLCJpbm5lclRleHQiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZXhpc3RlZENhdGVnb3J5IiwidG9JU09TdHJpbmciLCJnZXRUaW1lIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlZFByb2R1Y3RzIiwiZXhpc3RlZFByb2R1Y3QiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImNhbGwiXSwic291cmNlUm9vdCI6IiJ9