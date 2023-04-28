const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const eventos = [];

app.post('/eventos', async (req, res) => {
    const evento = req.body;
    console.log("Chegou um evento!");
    console.log(evento);
    eventos.push(evento);
    try {
        //envia o evento para o microsserviço de lembretes
        await axios.post('http://localhost:4000/eventos', evento);
        //envia o evento para o microsserviço de observações
        await axios.post('http://localhost:5000/eventos', evento);
        //envia o evento para o microsserviço de consultas
        await axios.post('http://localhost:6000/eventos', evento);
        //envia o evento para o microsserviço de classificação
        await axios.post('http://localhost:7000/eventos', evento);
    } catch (error) {
        console.log("Algum serviço está morto.");
    }
    res.send({ msg: "ok" });
});

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.');
});