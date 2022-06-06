import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  //select the elements you want to interact with
  const inputFullname = screen.getByTestId('fullname');
  const buttonSave = screen.getByTestId('save');
  const spanFullnameValid = screen.getByTestId('fullname-valid');


  //interact with those elements
  fireEvent.click(inputFullname);
  inputFullname.insertAdjacentText("afterbegin", "test");
  fireEvent.click(buttonSave);
// console.log(spanFullnameValid);
  // const linkElement = screen.getByText(/learn react/i);
  expect(spanFullnameValid).toBeInTheDocument();
});
