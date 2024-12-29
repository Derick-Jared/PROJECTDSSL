const productoRepository = require('../repositories/ProductoRepository');

class ProductoService{
    getAllProductos(){
        return productoRepository.findAll();
    }
    getProductoById(id){
        return productoRepository.findById(id);
    }
    createProducto(productoData){
        return productoRepository.create(productoData);
    }
    updateProducto(id, productoData){
        return productoRepository.update(id, productoData);
    }
    deleteProducto(id){
        return productoRepository.delete(id);
    }
}
module.exports=new ProductoService();