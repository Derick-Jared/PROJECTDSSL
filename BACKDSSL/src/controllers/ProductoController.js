const express = require('express');
const productoService=require('../services/ProductoService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const productos=await productoService.getAllProductos();
    res.json(productos);
});

router.get('/:id/',async(req,res)=>{
    const producto=await productoService.getProductoById(req.params.id);
    if(producto){
        res.json(producto);
    }else{
        res.status(404).json({message:'Producto no found'});
    }
});

router.post('/',async(req,res)=>{
    const newProducto=await productoService.createProducto(req.body);
    res.status(201).json(newProducto);
});

router.put('/:id',async(req,res)=>{
    const updateProducto=await productoService.updateProducto(req.params.id,req.body);
    if(updateProducto)
        res.status(201).json(updateProducto);
    else
    res.status(404).json({message:'Producto not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedProducto=await productoService.deleteProducto(req.params.id);
    if(deletedProducto){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Producto dont delete'});
    }
});
module.exports=router;