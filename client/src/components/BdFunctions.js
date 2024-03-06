import axios from "axios";

const fetchAgenda = async (setData) => {
    try {
        const response = await axios.get('http://localhost:5000/api/contatos')
        setData(response.data)
    } catch (error) {
        console.error('Erro ao puxar os contatos', error)
    }
}

const addNewContact = async (contato, data, setData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/contatos', {
            contato
        })

        setData([...data, response.data])
    } catch (error) {
        console.error('Erro ao adicionar novo contato', error)
    }
}

const editContact = async (id, contato, data, setData) => {
    try {
        await axios.put(`http://localhost:5000/api/contatos/${id}`, {
            contato
        })

        const updatedData = data.map((item) =>
            item.id === id ? { ...data, contato } : item
        );

        setData(updatedData)
    } catch (error) {
        console.error('Erro ao atualizar usuário', error)
    }
}

const deleteContact = async (id, data, setData) => {
    try {
        await axios.delete(`http://localhost:5000/api/contatos/${id}`)

        const updatedData = data.filter(item => item.id !== id)
        setData(updatedData)
    } catch (error) {
        console.error('Erro ao deletar contato', error)
    }
}

export { fetchAgenda, addNewContact, editContact, deleteContact }