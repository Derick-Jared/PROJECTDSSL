const CrudRepository = require('../lib/crudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository{
    constructor(){
        super(Producto);
    }
}
module.exports = new ProductoRepository();