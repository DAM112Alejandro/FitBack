const tipoUser = require('../models/tipoUser');
const { authorizeAdmin } = require('../middleware/auth');
const { query } = require('express');

exports.getTipoUserById = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const tipoDeUsuario = await tipoUser.findById(id);
      if (!tipoDeUsuario) {
        return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
      }
      res.status(200).json(tipoDeUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];
  
  exports.getTipoUser = [authorizeAdmin, async (req, res) => {
    try {
      const tiposDeUsuario = await tipoUser.find();
      res.status(200).json(tiposDeUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.addTipoUser = [authorizeAdmin,async (req, res) => {
    try {
      const { nombre } = req.body;
      const newTipoUser = new tipoUser({ nombre });
      if (findBy('nombre', newTipoUser.nombre) !== null) {
        return res.status(400).json({ error: 'El tipo de usuario ya existe' });
      }
      await newTipoUser.save();
      res.status(201).json(newTipoUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.updateTipoUser = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateTipoUser = await tipoUser.findByIdAndUpdate
          (id, req.body, { new: true });
      if (!updateTipoUser) {
          return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
          }
      res.status(200).json(instructor);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
  ];
  
  exports.deleteTipoUser = [authorizeAdmin, async (req, res) => {
      try {
          const { id } = req.params;
          const deleteTipoUser = await tipoUser.findByIdAndDelete(id);
          if (!deleteTipoUser) {
              return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
          }
          res.status(200).json({ message: 'Tipo de usuario eliminado' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }];


  function findBy(field,key ){
    query = {};
    query[field] = key
    return tipoUser.findOne(query);
  }
  