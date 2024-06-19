const tipoSub = require('../models/tipoSub');
const { authorizeAdmin } = require('../middleware/auth');
const { query } = require('express');

exports.getTipoSubById = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const tipoDeSub = await tipoSub.findById(id);
      if (!tipoDeSub) {
        return res.status(404).json({ error: 'Tipo de subscripcion no encontrado' });
      }
      res.status(200).json(tipoDeSub);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];
  
  exports.getTipoSubs = [authorizeAdmin, async (req, res) => {
    try {
      const tipoDeSubs = await tipoSub.find();
      res.status(200).json(tipoDeSubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.addTipoSub = [authorizeAdmin,async (req, res) => {
    try {
      const { nombre , precio } = req.body;
      const newTipoSub = new tipoSub({ nombre , precio });
      if (findBy('nombre', newTipoSub.nombre) !== null) {
        return res.status(400).json({ error: 'El tipo de subscripcion ya existe' });
      }
      await newTipoSub.save();
      res.status(201).json(newTipoSub);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }];

  exports.updateTipoSub = [authorizeAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateTipoSub = await tipoSub.findByIdAndUpdate
          (id, req.body, { new: true });
      if (!updateTipoSub) {
          return res.status(404).json({ error: 'Tipo de subcripcion no encontrado' });
          }
      res.status(200).json(updateTipoSub);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
  ];
  
  exports.deleteTipoSub = [authorizeAdmin, async (req, res) => {
      try {
          const { id } = req.params;
          const deleteTipoSub = await tipoSub.findByIdAndDelete(id);
          if (!deleteTipoSub) {
              return res.status(404).json({ error: 'Tipo de subscripcion no encontrado' });
          }
          res.status(200).json({ message: 'Tipo de subscriopcion eliminado' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }];


  function findBy(field,key ){
    query = {};
    query[field] = key
    return tipoSub.findOne(query);
  }
  