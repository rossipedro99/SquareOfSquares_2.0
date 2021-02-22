const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Territorio = require('../models/Territorios');
const Quadrado = require('../models/Quadrado');


router.get('/territories', async (req, res) => {
  await Territorio.find()
    .then(territorios => {
      res.status(200).send({
        count: territorios.length,
        data: territorios
      })
    })
    .catch(error => res.status(500).json(error));
});

router.get('/territories/:id', async (req, res) => {
  if (req.query.withpainted == 'true') {
    await Territorio.findOne({ _id: req.params.id })
      .then(territorios => {
        if (territorios == null) {
          res.status(400).send({ error: 'this territory was not found.' })
        } else {
          res.status(200).send({
            data: territorios
          })
        }
      })
      .catch(error => res.status(500).json(error));
  } else {
    await Territorio.findOne({ _id: req.params.id })
      .then(territorios => {
        if (territorios == null) {
          res.status(400).send({ error: 'this territory was not found.' })
        } else {
          const jsonRes = territorios.toJSON();
          delete jsonRes.painted_squares;
          res.status(200).send({
            data: jsonRes
          })
        }
      })
  }
});


router.post('/territories', async (req, res, next) => {
  const territorio = new Territorio({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    area: req.body.end.x * req.body.end.y,
    painted_area: req.body.painted_area,
    painted_squares: null
  });
  if (territorio.name == null || territorio.start == null || territorio.end == null) {
    res.status(400).send({ error: `Something is null` })
  }
  else if (territorio.name == "" || territorio.start == "" || territorio.end == "") {
    res.status(400).send({ error: `Something is missing` })
  }
  Territorio.find({ "start.x": req.body.start.x, "start.y": req.body.start.y, "end.x": req.body.end.x, "end.y": req.body.end.y }).countDocuments().then(territorios => {
    const validarTerritorios = territorios
    if (validarTerritorios > 0) {
      res.status(400).send({ error: `Area overlay` })
    }
    else {
      territorio
        .save()
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          res.status(500).json(error);
        },
          res.status(201).json({
            data: territorio,
            erro: false
          })
        );
    }
  })

});

router.delete('/territories/:id', async (req, res) => {
  await Territorio.findOneAndDelete({ _id: req.params.id })
    .then(territorios => {
      if (territorios == null) {
        res.status(400).send({ error: 'this territory was not found.' })
      } else {
        res.status(200).send({ error: false })
      }
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;