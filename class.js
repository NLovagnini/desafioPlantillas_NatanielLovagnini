const fs = require('fs')

module.exports = class Container {
    constructor (){
    }

    read = async (file) =>{
        let productsArray= []
        try{
            productsArray =  JSON.parse(await fs.promises.readFile(file, 'utf-8'));
        }catch(err){
            console.log(err)
        }
        return productsArray
    }

    write = async (input) =>{
        try{
            await fs.promises.writeFile('./products.json', JSON.stringify(input, null, 2))
        }catch(err){
        console.log(err)
        }
    }

   

    save = async (file, newObj) =>{
        try{
            const products = await this.read(file);
            const startingId = products.at(-1).id

            newObj.id = startingId+1
                    
            products.push({...newObj})
            this.write((products))
            return newObj.id
        } catch (err){
            console.log(err)
        }
    }
}
   
