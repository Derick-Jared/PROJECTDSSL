const CrudRepository = require('../lib/crudRepository');

const Usuario = require('../models/Usuario');

class UsuarioRepository extends CrudRepository{
    constructor(){
        super(Usuario);
    }
}
module.exports = new UsuarioRepository();