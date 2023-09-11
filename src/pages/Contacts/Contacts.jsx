import React, { useEffect } from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from '../../redux/filterSlice';
import {
  selectContacts,
  deleteContact,
  fetchContacts,
  selectError,
} from '../../redux/contactsSlice.js';
import { Container } from 'components/Сontainer/Container';

export default function Contacts() {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!Array.isArray(contacts)) {
      return [];
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm />
        </div>
        <div className={css.wrapper}>
          {error && <h2>Phonebook</h2>}
          <>
            <h2 className={css.title}>Contacts</h2>
            {contacts.length > 0 ? (
              <>
                <Filter value={filter} onChange={changeFilter} />
                <ContactList
                  contacts={getVisibleContacts()}
                  onDeleteContact={removeContact}
                />
              </>
            ) : (
              <p>No contacts found</p>
            )}
          </>
        </div>
      </div>
    </Container>
  );
}
