require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const categoriaController=require('./controllers/categoriaController');
const productoController=require('./controllers/productoController');
const detalleventaController=require('./controllers/detalleventaController');
const ventaController=require('./controllers/ventaController');
const usuarioController=require('./controllers/UsuarioController');
const app =express();
app.use(express.json());
app.use(helmet());

app.use(helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin'
}));

app.use((req, res,next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    next();
})

app.use('/api/categorias',categoriaController);
app.use('/api/productos',productoController);
app.use('/api/detalleventas',detalleventaController);
app.use('/api/ventas',ventaController);
app.use('/api/usuario',usuarioController);
const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`servidor corriendo en http://localhost:${port}`); //AltGr+cierre de llave=comilla simple al reves
})
