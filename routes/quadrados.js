const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Quadrado = require('../models/Quadrado');
const Territorios = require('../models/Territorios');
const Territorio = require('../models/Territorios');



router.get('/squares/:x/:y', async (req, res) => {
  await Quadrado.findOne({ x: req.params.x, y: req.params.y })
    .then(quadrados => {
      if (quadrados == null) {
        res.status(400).send({ error: 'this square does not belong to any territory' })
      } else {
        res.status(200).send({
          data: quadrados,
          error: false
        })
      }
    })
    .catch(error => res.status(500).json(error));
});


router.post('/squares', (req, res) => {
  const novoQuadrado = new Quadrado({
    x: req.body.x,
    y: req.body.y,
    painted: req.body.painted
  });


  novoQuadrado
    .save()
    .then(quadrado => {
      res.json(quadrado);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  res.status(201).json({
    data: novoQuadrado,
    erro: false
  })
});

/* Para associar o quadrado pintado com o território, colocar o _id com o id do território no body */


router.patch('/squares/:x/:y/paint', async (req, res) => {
  const novosDados = { painted_area: await Quadrado.find({ painted: true }).exec() };
  await Quadrado.updateOne({ x: req.params.x, y: req.params.y }, { $set: { painted: true } })
    .then(quadrados => {
      if (quadrados == null) {
        res.status(400).send({ error: 'this square does not belong to any territory' })
      } else {
        Territorio.findOneAndUpdate({ _id: req.body.id }, { painted_squares: novosDados.painted_area }, { new: true })
          .then(quadrados => {
          })
        Quadrado.findOne({ x: req.params.x, y: req.params.y })
          .then(quadrados => {
            res.status(200).send({
              data: quadrados,
              error: false
            })
          })
      }
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;