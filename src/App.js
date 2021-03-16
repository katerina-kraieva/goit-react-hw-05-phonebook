import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import Container from './Components/Container/Container';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';
import Alert from './Components/Alert/Alert';

// const contactsReserv = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
class App extends Component {
  state = {
    contacts: [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
],
    filter: '',
    message: false,
    showAlert: false,
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
      // this.setState({ contacts: contactsReserv });
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addNumber = (name, tel) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      this.setState({ message: `${name} is already in the  list`, showAlert: true });
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      number: tel,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteNumber = numberId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== numberId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normFilter));
  };

  render() {
    const { filter, message, showAlert } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <CSSTransition in={showAlert} timeout={500} classNames="Alert" unmountOnExit>
          <Alert message={message} />
        </CSSTransition>
        <Container>
          <CSSTransition in={true} appear={true} timeout={250} classNames="Logo" unmountOnExit>
            <h1>Phonebook</h1>
          </CSSTransition>
          <ContactForm onSubmit={this.addNumber} />
        </Container>
        <Container title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContacts} onDeleteNumber={this.deleteNumber} />
        </Container>
      </>
    );
  }
}

export default App;
