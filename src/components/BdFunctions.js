import axios from "axios";

const fetchAgenda = async (setData) => {
    try {
        const response = await axios.get('http://localhost:5000/contatos')
        setData(response.data)
    } catch (error) {
        console.error('Erro ao puxar os contatos', error)
    }

}

const addNewContact = async (nome, email, telefone, data, setData) => {
    try {
        const response = await axios.post('http://localhost:5000/contatos', {
            nome,
            email,
            telefone
        })

        setData([...data, response.data])
    } catch (error) {
        console.error('Erro ao adicionar novo contato', error)
    }
}

const editContact = async (id, nome, email, telefone, data, setData) => {
    try {
        await axios.put(`http://localhost:5000/contatos/${id}`, {
            nome,
            email,
            telefone
        })

        const updatedData = data.map((item) =>
            item.id === id ? { ...data, nome: nome, email: email, telefone: telefone } : item
        );

        setData(updatedData)
    } catch (error) {
        console.error('Erro ao atualizar usuário', error)
    }
}

const deleteContact = async (id, data, setData) => {
    try {
        await axios.delete(`http://localhost:5000/contatos/${id}`)

        const updatedData = data.filter(item => item.id !== id)
        setData(updatedData)
    } catch (error) {
        console.error('Erro ao deletar contato', error)
    }
}

export { fetchAgenda, addNewContact, editContact, deleteContact }