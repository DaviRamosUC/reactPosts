import React from 'react';
import './styles.css';
import P from 'prop-types';

export class Button extends React.Component {
  render() {
    const { text, onClick, disabled = false } = this.props;
    return (
      <button className="button" disabled={disabled} onClick={onClick}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
