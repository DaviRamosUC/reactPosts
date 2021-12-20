/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', function () {
  it('should have a value of searchValue', function () {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each Key pressed', function () {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'o valor'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', function () {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue={''} />);
    expect(container).toMatchSnapshot();
  });
});
