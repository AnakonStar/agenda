import * as React from 'react';
import '../styles/styles.scss';
import { ContactsList, OpenContactContainer, UserContainer } from '../components/sections/_router';
import { fetchAgenda } from '../components/BdFunctions';

//Pesquisei sobre o React-Router-Dom

export default function App() {
  const [contatos, setContatos] = React.useState([])
  const [selectedContact, setSelectedContact] = React.useState()

  const [idToEdit, setIdToEdit] = React.useState();

  const [isToEdit, setIsToEdit] = React.useState(false)

  React.useEffect(() => {
    fetchAgenda(setContatos)
  }, [])

  const handleSelectedContact = (id) => {
    const findContact = contatos.find(item => item.id === id)

    setSelectedContact(findContact)
  }

  function handleAddBtn() {
    setIsToEdit(false)
    setSelectedContact()
  }

  return (
    <main>
      <div className='contactsContainer'>
        <div className='contactsListContainer'>
          <UserContainer handleAddBtn={handleAddBtn} />
          <ContactsList
            selectedContact={selectedContact}
            contatosData={contatos}
            handleSelectedContact={(value) => handleSelectedContact(value)} />
        </div>
        <OpenContactContainer
          setIsToEdit={(value) => setIsToEdit(value)}
          setIdToEdit={(value) => setIdToEdit(value)}
          contatosData={contatos}
          setContatosData={(value) => setContatos(value)}
          isToEdit={isToEdit}
          idToEdit={idToEdit}
          setSelectedContact={(value) => setSelectedContact(value)}
          selectedContact={selectedContact} />
      </div>
    </main>
  );
}