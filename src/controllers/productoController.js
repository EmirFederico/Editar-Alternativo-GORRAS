const fs = require('fs');
const path = require('path');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productoController = {
    producto: (req, res) => {
        res.render('producto', {products: products});
    },
    listadoProducto: (req, res) => {
        res.render('listadoProductos', {products: products});
    },
    detail: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => {
			return product.id == id
		})
		res.render('producto', {product: product})
	},
    // (get) Create - Formulario para crear
	create: (req, res) => {
		res.render('product-create-form')

	},
	// (post) Create - Método para guardar la info
	store: (req, res) => {
		console.log(req.file);
		let newProducts = {
			id: products[products.length -1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
        products.push(newProducts);
		
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect('/')
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => {
			return product.id == id;
		});

		res.render('product-edit-form', {product: product})
	},
	// (post) Update - Método para actualizar la info
	update: (req, res) => {
		const id = req.params.id;
		let productToEdit = products.find(product => {
			return product.id == id;
		});

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: req.file ? req.file.filename : productToEdit.image
		}

		let newProducts = products;
		newProducts[id - 1] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
		res.redirect("/");
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy : (req, res) => {
		const id = req.params.id;
		let finalProducts = products.filter(product => {
			return product.id != id
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));

		res.redirect("/")
	}
};

module.exports = productoController;