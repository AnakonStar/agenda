import * as React from 'react';
import { addNewContact, deleteContact, editContact, fetchAgenda } from './components/BdFunctions';
import './styles/styles.scss';
import ReactInputMask from 'react-input-mask';
import { ButtonStylized, InputStylized } from './components/_router';

function App() {
  const [contatos, setContatos] = React.useState([])
  const [selectedContact, setSelectedContact] = React.useState()

  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tel, setTel] = React.useState('')
  const [idToEdit, setIdToEdit] = React.useState();

  const [isToEdit, setIsToEdit] = React.useState(false)

  React.useEffect(() => {
    fetchAgenda(setContatos)
  }, [])

  const handleSelectedContact = (id) => {
    const findContact = contatos.find(item => item.id === id)

    setSelectedContact(findContact)
  }

  const handleAddNewContact = () => {
    if (nome === '' || email === '' || tel === '') {
      alert('Preencha todos os campos')
    } else {
      addNewContact(nome, email, tel, contatos, setContatos)

      setEmail('')
      setNome('')
      setTel('')
    }
  }

  const handleDeleteContact = () => {
    deleteContact(selectedContact.id, contatos, setContatos)
    setSelectedContact()
    setIsToEdit(false)
  }

  const handleEditAndAddBtn = (forEdit) => {
    setIdToEdit(selectedContact.id)
    if (forEdit === true) {
      setEmail(selectedContact.email)
      setNome(selectedContact.nome)
      setTel(selectedContact.telefone)
    }
    setIsToEdit(forEdit)
    setSelectedContact()
  }

  const handleEditContact = () => {
    if (nome === '' || email === '' || tel === '' ) {
      alert('Preencha todos os campos corretamente')
    } else {
      editContact(
        idToEdit,
        nome,
        email,
        tel,
        contatos,
        setContatos
      )
    }
  }

  return (
    <main>
      <div className='contactsContainer'>
        <div className='contactsListContainer'>
          <div className='userContainer'>
            <div className='userData'>
              <div className='userPhoto'></div>
              <span>
                Username
              </span>
            </div>
            <button className='addContactBtn' onClick={() => handleEditAndAddBtn(false)}>
              <span>
                +
              </span>
            </button>
          </div>
          {
            contatos.length
              ?
              <li className="contactsListContainer">
                {contatos.map((item) => (
                  <ul key={item.id} className="contactsListName">
                    <button onClick={() => handleSelectedContact(item.id)}>
                      <span>{item.nome}</span>
                    </button>
                  </ul>
                ))}
              </li>
              :
              <p className='alertListTxt'>
                Você ainda não possui nenhum contato
              </p>
          }

        </div>
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
                <button className='editContactBtn' onClick={() => handleEditAndAddBtn(true)}>
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
              <InputStylized placeholder='Telefone' value={tel} setValue={(t) => setTel(t.target.value)} maxLength={11} />
              <ButtonStylized type='submit'>{isToEdit ? 'Editar' : 'Adicionar'}</ButtonStylized>
            </form>

          }
        </div>
      </div>
    </main>
  );
}

export default App;
