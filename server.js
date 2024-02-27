const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/contatos', async (req, res) => {
    const contatos = await prisma.contato.findMany();
    res.json(contatos)
})

app.post('/contatos', async (req, res) => {
    const { nome, email, telefone } = req.body;

    const newContact = await prisma.contato.create({
        data: {
            nome,
            email,
            telefone
        }
    })

    res.json(newContact)
})

app.put('/contatos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body

    const editContact = await prisma.contato.update({
        where: { id: parseInt(id) },
        data: { nome: nome, email: email, telefone: telefone },
    });

    res.json(editContact)
})

app.delete('/contatos/:id', async (req, res) => {
    const { id } = req.params;

    const deleteContact = await prisma.contato.delete({
        where: { id: parseInt(id) }
    })

    res.json(deleteContact)
})

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
})