import * as React from 'react';

export default function ContactsList({ contatosData, handleSelectedContact, selectedContact }) {
    return (
        <>
            {
                contatosData.length
                    ?
                    <ul className="contactsListContainer">
                        {contatosData.map((item) => (
                            <li key={item.id} className="contactsListName" style={selectedContact && { backgroundColor: item.id === selectedContact.id ? '#b1b1b1' : 'transparent' }}>
                                <button onClick={() => handleSelectedContact(item.id)}>
                                    <span>{item.nome}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    :
                    <p className='alertListTxt'>
                        Você ainda não possui nenhum contato
                    </p>
            }
        </>
    )
}