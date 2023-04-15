import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './ContactList/Filter/Filter';

const KEY_STOREGE_CONTACTS = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => getStorageContacts() || []);
  const [filter, setFilter] = useState('');

  function getStorageContacts() {
    return JSON.parse(localStorage.getItem(KEY_STOREGE_CONTACTS));
  }

  useEffect(() => {
    localStorage.setItem(KEY_STOREGE_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = newContact => {
    setContacts([...contacts, ...[newContact]]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitForm} contacts={contacts} />
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={changeFilter} />
          <ContactList
            contacts={filteredContacts()}
            removeContact={removeContact}
          />
          <ToastContainer />
        </>
      )}
    </section>
  );
}
