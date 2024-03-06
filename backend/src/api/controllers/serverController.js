const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getContatos = async (req, res) => {
    const contatos = await prisma.contato.findMany();
    res.json(contatos);
};

const createContato = async (req, res) => {
    const { contato } = req.body;

    const newContact = await prisma.contato.create({
        data: contato
    });
    res.json(newContact);
};

const updateContato = async (req, res) => {
    const { id } = req.params;
    const { contato } = req.body;

    const editContact = await prisma.contato.update({
        where: { id: parseInt(id) },
        data: contato,
    });

    res.json(editContact);
};

const deleteContato = async (req, res) => {
    const { id } = req.params;

    const deleteContact = await prisma.contato.delete({
        where: { id: parseInt(id) }
    });

    res.json(deleteContact);
};

module.exports = {
    getContatos,
    createContato,
    updateContato,
    deleteContato
};
