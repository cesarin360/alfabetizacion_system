const indexCtrl = {};

const Handlebars = require('handlebars')

const Silaba = require('../models/Silabas')

Handlebars.registerHelper('ifDif', function (v1, v2, options) {
    if (v1 != v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

const colorsHex = ['',
    '#868e96',
    '#FFA4ED',
    "#3241FF",
    "#FF4D4D",
    "#88FF7F",
    "#FFA87F",
    "#19191A",
    "#852D9F",
    "#28F2FF",
    "#FFFA54"]

const colorsHex1 = ['',
    '#868e96',
    '#FFA4ED',
    "#3241FF",
    "#FF4D4D",
    "#88FF7F",
    "#FFA87F",
    "#19191A",
    "#852D9F",
    "#28F2FF",
    "#FFFA54",
    '#868e96',
    '#FFA4ED',
    '#3241FF',
    '#FF4D4D',
    '#88FF7F',
    '#FFA87F',
    '#19191A',
    '#852D9F',
    '#28F2FF',
    '#FFFA54',
    '#7FDBFF',
    '#FFD700',
    '#FF6347',
    '#CD5C5C',]

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

indexCtrl.renderModules = (req, res) => {
    res.render('modulos')
};

indexCtrl.renderLearning = (req, res) => {
    res.render('aprendizaje/etapas')
};

indexCtrl.renderHelp = (req, res) => {
    res.render("ayuda/ayuda")
};

indexCtrl.renderGame = (req, res) => {
    res.render("gamificacion/gamificacion")
};

indexCtrl.renderEtapa1 = (req, res) => {
    console.log(req.query)
    if (req.query) {
        const paramsNextExercise = req.query.next
        res.render('aprendizaje/etapa-1', { colorsHex, paramsNextExercise })
    } else {
        const paramsNextExercise = null
        res.render('aprendizaje/etapa-1', { colorsHex, paramsNextExercise })
    }

};

indexCtrl.renderEtapa1Ejercicios = (req, res) => {
    res.render('aprendizaje/etapa-1/' + req.params.ejercicio)
};

indexCtrl.renderEtapa2 = (req, res) => {
    console.log(req.query)
    if (req.query) {
        const paramsNextExercise = req.query.next
        res.render('aprendizaje/etapa-2', { colorsHex1, paramsNextExercise })
    } else {
        const paramsNextExercise = null
        res.render('aprendizaje/etapa-2', { colorsHex1, paramsNextExercise })
    }

};

indexCtrl.renderEtapa2Ejercicios = async (req, res) => {
    if (String(req.params.ejercicio).includes("23")) {
        res.render('aprendizaje/etapa-2/number_line')
    }
    else if (String(req.params.ejercicio).includes('24')) {
        res.render('aprendizaje/etapa-2/number_line1')
    }
    else {
        const num = Number(req.query.num);
        const num2 = num + 1
        const silaba = await Silaba.findOne({ num });
        console.log(silaba);
        res.render('aprendizaje/etapa-2/silabas', { silaba, num2 })
    }

};

indexCtrl.renderEtapa3 = (req, res) => {
    if (req.query) {
        const paramsNextExercise = req.query.next
        res.render('aprendizaje/etapa-3', { colorsHex, paramsNextExercise })
    }else{
        const paramsNextExercise = null;
        res.render('aprendizaje/etapa-3', { colorsHex, paramsNextExercise })
    }
    
};

indexCtrl.renderEtapa3Ejercicios = (req, res) => {
    if(String(req.params.ejercicio).includes("10")){
        res.render('aprendizaje/etapa-3/disgrafia')
    }else if(String(req.params.ejercicio).includes("11")){
        res.render('aprendizaje/etapa-3/disgrafia1')
    }else if(String(req.params.ejercicio).includes("12")){
        res.render('aprendizaje/etapa-3/disgrafia2')
    }else if(String(req.params.ejercicio).includes("1")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'A', letterTwo: 'B', lastLetter:'C', num: 2})
    }else if(String(req.params.ejercicio).includes("2")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'D', letterTwo: 'E', lastLetter:'F', num: 3})
    }else if(String(req.params.ejercicio).includes("3")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'G', letterTwo: 'H', lastLetter:'I', num: 4})
    }else if(String(req.params.ejercicio).includes("4")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'J', letterTwo: 'K', lastLetter:'L', num: 5})
    }else if(String(req.params.ejercicio).includes("5")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'M', letterTwo: 'N', lastLetter:'Ñ', num: 6})
    }else if(String(req.params.ejercicio).includes("6")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'O', letterTwo: 'P', lastLetter:'Q', num: 7})
    }else if(String(req.params.ejercicio).includes("7")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'R', letterTwo: 'S', lastLetter:'T', num: 8})
    }else if(String(req.params.ejercicio).includes("8")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'U', letterTwo: 'V', lastLetter:'W', num: 9})
    }else if(String(req.params.ejercicio).includes("9")){
        res.render('aprendizaje/etapa-3/letras', {letterOne:'X', letterTwo: 'Y', lastLetter:'Z', num: 10})
    }
};


indexCtrl.games = (req, res) => {
    res.render('gamificacion/' + req.params.game)
}

module.exports = indexCtrl;