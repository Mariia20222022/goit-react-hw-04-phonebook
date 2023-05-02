import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState(``);

  const handleAddContact = newContact => {
    const existingNames = contacts.map(contact => contact.name);
    if (existingNames.includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };
  const handleFilterChange = event => {
    setFilter(event.target.value);
  };
  const filterContacts = () => {
    if (!contacts) {
      return [];
    }
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    const contactsData = localStorage.getItem(`contacts`);

    if (contactsData) {
      try {
        const parsedContacts = JSON.parse(contactsData);
        setContacts(parsedContacts);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(`contacts`, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} contacts={contacts} />
      <p className={css.subtitle}>Contacts:</p>
      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={filterContacts()}
        filter={filter}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
