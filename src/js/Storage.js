const category = [
    {
        id: 1,
        title: 'frontend',
        description: 'web developer front',
        creatAt: ''
    },
]


export class Storage{
    
    // categories

    static getAllCategories(){
        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
        return savedCategories.sort((a, b) => new Date(a.creatAt) > new Date(b.creatAt) ? -1 : 1);
    }

    static savedCategory(category){
        const savedCategories = Storage.getAllCategories();
        const existedCategory = savedCategories.find(c => c.id === parseInt(category.id));

        if (existedCategory) {
            // update
            existedCategory.title = category.title;
            existedCategory.description = category.description;
            existedCategory.creatAt = new Date().toISOString();
            
        }else{
            // new
            category.id = new Date().getTime();
            category.creatAt = new Date().toISOString();
            savedCategories.push(category)
        }

        localStorage.setItem('category', JSON.stringify(savedCategories))
    }

    // ------------------------------------------------

    // products

    static getAllProducts(){
        const savedProducts = JSON.parse(localStorage.getItem('product')) || [];
        
        return savedProducts.sort((a, b) => new Date(a.creatAt) > new Date(b.creatAt) ? -1 : 1);
    }

    static savedProduct(product){
        const savedProducts = Storage.getAllProducts();
        const existedProduct = savedProducts.find(c => c.id === parseInt(product.id));

        if (existedProduct) {
            // update
            existedProduct.title = product.title;
            existedProduct.category = product.category;
            existedProduct.quantity = product.quantity
            existedProduct.creatAt = new Date().toISOString();
            
        }else{
            // new
            product.id = new Date().getTime();
            product.creatAt = new Date().toISOString();
            savedProducts.push(product)
        }

        localStorage.setItem('product', JSON.stringify(savedProducts))
    }

    static deleteProduct(id){
        const savedProducts = Storage.getAllProducts()
        const filterdProducts = savedProducts.filter(product => product.id !== parseInt(id))
        localStorage.setItem('product', JSON.stringify(filterdProducts))
    }
}