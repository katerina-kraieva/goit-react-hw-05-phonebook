import shortid from 'shortid';
import s from './Filter.module.css';

function Filter({ value, onChange }) {
  const findId = shortid.generate();
  return (
    <div>
      <label htmlFor={findId} className={s.label}>Find contacts by name</label>
      <input className={s.input} id={findId} type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default Filter;