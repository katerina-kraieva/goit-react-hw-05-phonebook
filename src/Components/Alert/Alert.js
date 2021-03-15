import React from 'react';
import s from './Alert.module.css';

export default function Alert({ message }) {
  return (
    <div className={s.container}>
      <p className={s.text}>{message}</p>
    </div>
  );
}