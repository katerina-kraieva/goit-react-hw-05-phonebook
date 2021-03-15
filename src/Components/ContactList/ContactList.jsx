import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import s from './ContactList.module.css';
import PhoneList from './fade.module.css';

function ContactList({ contacts, onDeleteNumber }) {
  return (
    <TransitionGroup component="ol" className={s.list}>
      {contacts.map(contact => (
        <CSSTransition key={contact.id} timeout={250} classNames={PhoneList}>
          <li key={contact.id} className={s.item}>
            <span>
              <b>{contact.name}:</b> {contact.number}
            </span>
            <button className={s.button} type="button" onClick={() => onDeleteNumber(contact.id)}>
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ContactList;