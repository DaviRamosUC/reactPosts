import './styles.css';
import P from 'prop-types';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <>
      <input
        id="search"
        onChange={handleChange}
        value={searchValue}
        type="search"
        className="input"
        placeholder="Type your search"
      />
    </>
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
