import fs from "fs";

class ProductManager {
  
    constructor (PATH, products = []){
        this.products = products
        this.PATH = PATH
        
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
    
        if (title, description, price, thumbnail, code, stock){
    
            if (!this.products.some((prod) => prod.code === code)) {
                const product = {
                    id: this.generateID(),
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                this.products.push(product)
                await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, null))
        
                }else console.log(`operacion fallida el produto ${title} tiene un code ya existente, debe generar uno nuevo`) 
    
        }else{
            console.log("error, Debes ingresar todos los campos del productos");
        }
    
    }
    
    generateID () {
        let id = 0
        if (this.products.length === 0) {
            id = 1
        }else{
            id = this.products[this.products.length - 1].id + 1 
        }
        return id
    }
    
    getProducts = async () => {
       let data = await fs.promises.readFile(this.PATH, "utf-8")
       let products = JSON.parse(data) 
        return products
    
    }
    
    getProductById = async (id) => {
        let productsData =  JSON.parse(await fs.promises.readFile(this.PATH, "utf-8"))
        let productFinded = await productsData.find((prod) => prod.id === id )

        if (!productFinded) {
           return console.log("Not found")
        }
        return productFinded
    
    }

    updateProduct = async (id, campo, valor) => {
        let data = await fs.promises.readFile(this.PATH, "utf-8")
        
        let products = JSON.parse(data)

        let productToUpdate = products.find((prod) => prod.id === id)
        
        let productToUpdateKeys = Object.keys(productToUpdate)


        if (productToUpdateKeys.includes(campo)){

          productToUpdate[campo] = valor
          
          let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(products))

          return  listUpdated
        
        }else{

            productToUpdate[campo] = valor

            let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(products))

            return listUpdated
            
        }
    }

    deleteProduct = async(id) => {
        let data = await fs.promises.readFile(this.PATH, "utf-8")
        
        let products = JSON.parse(data)

            let productToDelete = products.find((prod) => prod.id === id)
        
            let productToDeleteIndex = await products.findIndex((prod) => prod.id === id)
                
            let newProducts = products.splice((productToDeleteIndex),1)
                
            let listUpdated = fs.promises.writeFile(this.PATH, JSON.stringify(products, null))   
                
            return products
        
    }
}

const PATH = "./products.json"
const ProductHandler = new ProductManager(PATH)

    await ProductHandler.addProduct("Monitor", "Monitor Samsung 27 pulgadas", 200000, "samsung.com/monitores", 251, 12)
    await ProductHandler.addProduct("Teclado", "teclado mecanico bla bla", 18500, "miteclado.com/mecanico", 220, 25)
    await ProductHandler.addProduct("mouse", "mouse optico hjsdhjhasd", 15000, "mousesjsjjs.com/mouse", 221, 85)
    await ProductHandler.addProduct("cableHDMI", "clableBla-bla", 3000, "mousesjsjjs.com/mouse", 252, 15)
    //await ProductHandler.addProduct("cableHDMI", "clableBla-bla", 3000, "mousesjsjjs.com/mouse", 256, 15)

    
    //console.log(await ProductHandler.getProductById())
    await ProductHandler.updateProduct(2,"title", "Teclado Inalambrico")
    await ProductHandler.deleteProduct(3)
    console.log(await ProductHandler.getProducts())


