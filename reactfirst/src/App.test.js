import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('test 1', () => {
  render(<App />);

  //select the elements for interaction
  const inputEmail = screen.getByTestId('email');
  const spanEmailValid = screen.getByTestId('email-valid');
  const buttonSave = screen.getByTestId('save');

  //interact with those elements
  fireEvent.click(inputEmail);
  fireEvent.change(inputEmail, {target: {value: 'dragan'}})
  fireEvent.click(buttonSave);

  var text = spanEmailValid.textContent;
  //test validation
  expect("Please enter valid email address").toBe(text);
});


test('test 2', () => {
  render(<App />);

  //select the elements for interaction
  const checkboxFixed = screen.getByTestId('flexible');
  const inputDays = screen.getByTestId('days');
  const spanDaysValid = screen.getByTestId('days-valid');
  const buttonSave = screen.getByTestId('save');

  //interact with those elements
  fireEvent.click(inputDays);
  fireEvent.change(inputDays, {target: {value: 'dragan'}})
  fireEvent.click(buttonSave);

  //test validation
  expect("Your days of availability are not specified!").toBe(spanDaysValid.textContent);

  fireEvent.click(inputDays);
  fireEvent.change(inputDays, {target: {value: '66'}})
  fireEvent.click(buttonSave);

  //test ReValidation
  expect("").toBe(spanDaysValid.textContent);
});

