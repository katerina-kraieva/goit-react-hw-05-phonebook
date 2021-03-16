import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import s from './ContactForm.module.css';
import Alert from '../Alert/Alert';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    message: false,
    showAlert: false,
  };

  handleChangeName = e => {
    this.setState({
      name: e.currentTarget.value,
    });
  };

  handleChangeNumber = e => {
    this.setState({
      number: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() === '' || this.state.number.trim() === '') {
      this.setState({ message: `Fill Name and Number!`, showAlert: true });
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
      console.log('error');
    } else {this.props.onSubmit(this.state.name, this.state.number);}

    // this.props.onSubmit(this.state.name, this.state.number);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, message, showAlert} = this.state;
    const nameId = shortid.generate();
    const telId = shortid.generate();

    return (
      <>
      <CSSTransition in={showAlert} timeout={500} classNames="Alert" unmountOnExit>
          <Alert message={message} />
        </CSSTransition>
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label htmlFor={nameId}> Name </label>
        <input
          className={s.input}
          id={nameId}
          type="text"
          value={name}
          onChange={this.handleChangeName}
        />
        <label htmlFor={telId}> Number </label>
        <input
          className={s.input}
          id={telId}
          type="text"
          value={number}
          onChange={this.handleChangeNumber}
        />
        <button className={s.button} type="submit">
          Add contact
        </button>
        </form>
        </>
    );
  }
}

export default ContactForm;