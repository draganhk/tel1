import React  from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      flexible: '',
      days: '',
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log(name+":"+value);
  }

  // handleSubmit(event) {
  //   alert('Your favorite flavor is: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
      <div className="App">
      <header className="App-header">
          <div className="Text-red">
            * Required Fields
          </div>
          <div>
            Full Name* :
            <input type="text" name="fullname" value={this.state.fullname}
            onChange={this.handleChange} maxLength="100"></input>
          </div>
          <div>
            Email Address:
            <input type="text" name="email" value={this.state.email}
            onChange={this.handleChange}></input>
          </div>
          <div>
            Flexible:
            <input type="checkbox" name="flexible" value={this.state.flexible}
            onChange={this.handleChange}></input>
          </div>
          <div>
            Days of Availability:
            <input type="number" name="days" value={this.state.days}
            onChange={this.handleChange}></input>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
      </header>
    </div>
    );
  }
}

export default App;
