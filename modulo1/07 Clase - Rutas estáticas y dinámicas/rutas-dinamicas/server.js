const express = require("express");
const cursos = require('./cursos');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

// routes
app.get('/', (req, res) => {
    res.send('Bienvenidos al servidor web de rutas dinámicas');
});
app.get('/curso', (req, res) => {
    const queryParams = Object.keys(req.query)
    if (queryParams.length === 0) {
        res.json(cursos);
    } else {
        let resultado = [];
        for (let curso of cursos) {
            console.log(req.query);
            if (curso.nombre.toLowerCase() === String(req.query.nombre).toLowerCase()
                && curso.categoria.toLowerCase() === String(req.query.categoria).toLowerCase()) {
                resultado.push(curso)
            }
        }
        resultado.length > 0 ?
            res.json(resultado) : res.json({ id: 'ERROR', description: req.query.nombre })
    }
});
// url params
app.get('/cursos/:categoria', (req, res) => {
    let parametro = req.params.categoria.trim().toLowerCase();
    console.log(parametro)
    if (parametro !== '') {
        let resultado = []
        for (let curso of cursos) {
            if (curso.categoria.toLowerCase() === parametro) {
                resultado.push(curso)
            }
        }
        resultado.length > 0 ?
            res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
    }
});
app.get('/cursos/codigo/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    if (id !== '') {
        let resultado = []
        for (let curso of cursos) {
            if (curso.id === Number(id)) {
                resultado.push(curso)
            }
        }
        resultado.length > 0 ?
            res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
    }
});
app.get('/curso/nombre/:nombre', (req, res) => {
    let nombre = req.params.nombre.trim().toLowerCase();
    console.log(nombre);
    if (nombre !== '') {
        let resultado = []
        for (let curso of cursos) {
            if (curso.nombre.toLowerCase() === nombre) {
                resultado.push(curso)
            }
        }
        resultado.length > 0 ?
            res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
    }
});
app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe');
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
