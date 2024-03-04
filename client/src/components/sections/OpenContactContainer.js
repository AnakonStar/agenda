import * as React from 'react';
import ButtonStylized from '../ButtonStylized';
import InputStylized from '../InputStylized';
import { deleteContact, addNewContact, editContact } from '../BdFunctions';
import ReactInputMask from 'react-input-mask';

export default function OpenContactContainer({ setIdToEdit, selectedContact, setIsToEdit, isToEdit, contatosData, setContatosData, idToEdit, setSelectedContact }) {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefone, setTelefone] = React.useState('')

    React.useEffect(() => {
        handleEditAndAddBtn()
    }, [isToEdit])

    function handleAddNewContact() {
        if (!nome || !email || !telefone || telefone.length < 11) {
            console.log('Preencha todos os campos')
        } else {
            addNewContact({ nome, email, telefone }, contatosData, setContatosData)

            setEmail('')
            setNome('')
            setTelefone('')
        }
    }

    function handleEditAndAddBtn() {
        if (isToEdit) {
            setIdToEdit(selectedContact.id)
            setEmail(selectedContact.email)
            setNome(selectedContact.nome)
            setTelefone(selectedContact.telefone)
        } else {
            setEmail('')
            setNome('')
            setTelefone('')
        }
        setSelectedContact()
    }

    function handleDeleteContact() {
        deleteContact(selectedContact.id, contatosData, setContatosData)
        setSelectedContact()
        setIsToEdit(false)
    }

    function handleEditContact() {
        if (!nome || !email || !telefone || telefone.length < 11) {
            console.log('Preencha todos os campos corretamente')
        } else {
            editContact(
                idToEdit,
                { nome, email, telefone },
                contatosData,
                setContatosData
            )
        }
    }

    return (
        <div className='openContactContainer'>
            {selectedContact ?
                <>
                    <div className='openContactData'>
                        <div className='openContactPhoto' />
                        <section>
                            <span className='openContactName'>
                                {selectedContact.nome}
                            </span>
                            <span className='openContactEmail'>
                                {selectedContact.email}
                            </span>
                        </section>
                    </div>
                    <section className='openContactTelContainer'>
                        <span>
                            Número de contato
                        </span>
                        <span>
                            <ReactInputMask className='openContactTel' mask="(99) 99999-9999" value={selectedContact.telefone} readOnly />
                        </span>
                    </section>
                    <div className='editContactContainer'>
                        <button className='editContactBtn' onClick={handleDeleteContact}>
                            <span>
                                x
                            </span>
                        </button>
                        <button className='editContactBtn' onClick={() => setIsToEdit(true)}>
                            <span>
                                \\
                            </span>
                        </button>
                    </div>
                </>
                :
                <form className='contactForm' onSubmit={isToEdit ? handleEditContact : handleAddNewContact}>
                    <p>
                        {
                            isToEdit
                                ?
                                'Editar '
                                :
                                'Adicionar novo '
                        }
                        contato
                    </p>

                    <InputStylized placeholder='Nome' value={nome} setValue={(t) => setNome(t.target.value)} />
                    <InputStylized placeholder='Email' value={email} setValue={(t) => setEmail(t.target.value)} />
                    <InputStylized placeholder='Telefone' value={telefone} setValue={(t) => setTelefone(t.target.value)} maxLength={11} />
                    <ButtonStylized type='submit'>{isToEdit ? 'Editar' : 'Adicionar'}</ButtonStylized>
                </form>
            }
        </div>
    )
}