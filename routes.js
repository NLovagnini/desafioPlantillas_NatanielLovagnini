const Container = require('./class.js')
const prodContainer = new Container()
const {Router} = require('express')
const file = './products.json'
const router = Router()
const multer = require('multer')


//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+"/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname )
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        if(ext !== '.png'){
            return cb(new Error('Only png files allowed'))
        }
        cb(null, true)
    }
})

router.use(multer({storage}).single("thumbnail"))

//Get all
const getAllProds = async () =>{
    const allProductsArr = await prodContainer.read(file);
    return allProductsArr;
}

//Get product by id
const getProdById = async (id) =>{
    const allProductsArr = await prodContainer.read(file);
    const newProductsArr = allProductsArr.filter((prod) => prod.id == id);
    return newProductsArr
}
 


router.get('/', async (req, res) =>{
    let products = await getAllProds()
    res.render('showProducts', {
        products
    })
})

router.get('/:id', async (req, res) =>{
    const {id} = req.params
    if (getProdById(id) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    res.send(await getProdById(id)) 
})

router.post('/uploadfile', (req, res) =>{
    res.json({message: 'Upload Successful'})
})

router.post('/', async (req, res) =>{
    const newObj = req.body
    const objImg = req.file
    newObj.thumbnail = `/uploads/${objImg.filename}`
    prodContainer.save(file, newObj)
    let products = await getAllProds()
    res.render('showProducts', {
        products
    })
})

router.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    if (await getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1, {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id})
    res.json(products)
})

router.delete('/:id', async (req, res) =>{
    const {id} = req.params
    if (await getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    products.splice(id-1, 1)
    res.send(products)
})



module.exports = router