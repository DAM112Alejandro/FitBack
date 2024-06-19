const tipoClase = require('../models/tipoClase');
const { authorizeAdmin } = require('../middleware/auth');
const { query } = require('express');

exports.getTipoClaseById = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const tipoDeClase = await tipoClase.findById(id);
      if (!tipoDeClase) {
        return res.status(404).json({ error: 'Tipo de clase no encontrado' });
      }
      res.status(200).json(tipoDeClase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];
  
  exports.getTipoClases = [authorizeAdmin, async (req, res) => {
    try {
      const tipoDeClases = await tipoClase.find();
      res.status(200).json(tipoDeClases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.addTipoClase = [authorizeAdmin,async (req, res) => {
    try {
      const { nombre } = req.body;
      const newTipoClase = new tipoClase({ nombre });
      if (findBy('nombre', newTipoClase.nombre) !== null) {
        return res.status(400).json({ error: 'El tipo de clase ya existe' });
      }
      await newTipoClase.save();
      res.status(201).json(newTipoClase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.updateTipoClase = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateTipoClase = await tipoClase.findByIdAndUpdate
          (id, req.body, { new: true });
      if (!updateTipoClase) {
          return res.status(404).json({ error: 'Tipo de clase no encontrado' });
          }
      res.status(200).json(updateTipoClase);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }];
  
  exports.deleteTipoClase = [authorizeAdmin, async (req, res) => {
      try {
          const { id } = req.params;
          const deleteTipoClase = await tipoClase.findByIdAndDelete(id);
          if (!deleteTipoClase) {
              return res.status(404).json({ error: 'Tipo de clase no encontrado' });
          }
          res.status(200).json({ message: 'Tipo de clase eliminado' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }];


  function findBy(field,key ){
    query = {};
    query[field] = key
    return tipoClase.findOne(query);
  }
  