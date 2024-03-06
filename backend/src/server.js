const express = require('express');
const cors = require('cors');
const contatosController = require('./api/controllers/serverController');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/contatos', contatosController.getContatos);
app.post('/api/contatos', contatosController.createContato);
app.put('/api/contatos/:id', contatosController.updateContato);
app.delete('/api/contatos/:id', contatosController.deleteContato);

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
