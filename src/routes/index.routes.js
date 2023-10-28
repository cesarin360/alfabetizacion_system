const { Router } = require('express')
const router = Router();

const { renderIndex, renderAbout, renderModules, renderLearning, renderHelp, renderGame, renderEtapa1, renderEtapa2, renderEtapa3, renderEtapa1Ejercicios, renderEtapa2Ejercicios, renderEtapa3Ejercicios, games } = require('../controllers/index.controller')

router.get('/', renderIndex)

router.get('/about', renderAbout)

router.get('/modulos', renderModules)

router.get('/modulos/aprendizaje', renderLearning)

router.get("/modulos/ayuda", renderHelp)

router.get("/modulos/gamificacion", renderGame)

router.get('/modulos/aprendizaje/etapa-1', renderEtapa1)

router.get('/modulos/aprendizaje/etapa-1/:ejercicio', renderEtapa1Ejercicios)

router.get('/modulos/aprendizaje/etapa-2', renderEtapa2)

router.get('/modulos/aprendizaje/etapa-2/:ejercicio', renderEtapa2Ejercicios)

router.get('/modulos/aprendizaje/etapa-3', renderEtapa3)

router.get('/modulos/aprendizaje/etapa-3/:ejercicio', renderEtapa3Ejercicios)

router.get('/modulos/gamificacion/:game', games)

module.exports = router;