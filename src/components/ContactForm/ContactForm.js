import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

function ContactForm(props) {
  const [name, setName] = useState(``);
  const [number, setNumber] = useState(``);
  const handleSubmit = event => {
    event.preventDefault();

    const existingNames = props.contacts.map(contact =>
      contact.name.toLowerCase()
    );
    if (
      existingNames.some(existingName => existingName === name.toLowerCase())
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    props.onSubmit(newContact);

    resetForm();
  };

  const resetForm = () => {
    setName(``);
    setNumber(``);
  };

  return (
    <div>
      {' '}
      <form className={css.form} onSubmit={handleSubmit}>
        {' '}
        <div className={css.field}>
          {' '}
          <label className={css.label} htmlFor="name">
            Name:{' '}
          </label>{' '}
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor="number">
            Number:
          </label>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={event => setNumber(event.target.value)}
            value={number}
          />
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
