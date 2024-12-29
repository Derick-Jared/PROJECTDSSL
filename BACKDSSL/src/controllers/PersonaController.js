const express = require('express');
const personaService =require('../services/PersonaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const person=await personaService.getAllPersons();
    res.json(person);
});

router.get('/:id/',async(req,res)=>{
    const person=await personaService.getPersonById(req.params.id);
    if(person){
        res.json(person);
    }else{
        res.status(404).json({message:'Persona no found'});
    }
});

router.post('/',async(req,res)=>{
    const newPerson=await personaService.createPerson(req.body);
    res.status(201).json(newPerson);
});

router.put('/:id',async(req,res)=>{
    const updatePerson=await personaService.updatePerson(req.params.id,req.body);
    if(updatePerson)
        res.status(201).json(updatePerson);
    else
    res.status(404).json({message:'Usuario not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletePerson=await personaService.deletePerson(req.params.id);
    if(deletePerson){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Usuario dont delete'});
    }
});
module.exports=router;