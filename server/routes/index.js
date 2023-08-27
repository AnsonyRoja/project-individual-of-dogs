const getDogs = require('../controllers/getDogs');
const getRacesById = require('../controllers/getRacesById');
const getDogsName = require('../controllers/getDogsName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getTemperamentsDogs = require('../controllers/getTemperamentDogs');
const getRacesByIdBd = require('../controllers/getRacesByIdBd');
const router = require("express").Router();






router.get("/dogs", getDogs);

router.get("/dogs/name", getDogsName);

router.get("/dogs/temperaments", getTemperamentsDogs)

router.post("/dogs", postDogs);

router.get("/temperaments", getTemperaments);

router.get("/dogss/:id", getRacesByIdBd);

router.get("/dogs/:idRaza", getRacesById);












module.exports = router;