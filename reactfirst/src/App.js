import React  from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      valid: true,
      flexible: false ,
      days: '',
      message: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // console.log(name+":"+value);
  }

  //email validation
  handleEmail(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // if (value.length>6){
      if (typeof value !== "undefined") {
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
          if (!pattern.test(value)) {
            this.setState({
              valid: false
            });
          }else{
            this.setState({
              valid: true
            });
          }
      }
    // }

    this.setState({
      [name]: value
    });

    // console.log(name+":"+value+"  valid:"+this.state.valid);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.flexible && !isFinite(this.state.days)){
      this.setState({
        message: true
      });
    }else{
      this.setState({
        message: false
      });
    }
    // console.log("flexible: "+this.state.flexible+ " | days:"+this.state.days);
  }

  render() {
    const isCheckedIn = this.state.flexible;
    const isValidEmail = this.state.valid;
    const isValidDays = this.state.message;

    let star, valid, err;
    star = isCheckedIn ? "*" : "";
    valid = isValidEmail ? "" : "Please enter valid email address.";
    err = isValidDays ? "Your days of availability are not specified!" : "";

    return (
      <div className="App">
      <header className="App-header">
          <div className="Text-red">
            * Required Fields
          </div>
          <div>
            Full Name* :&nbsp;
            <input type="text" name="fullname" value={this.state.fullname}
            onChange={this.handleChange} maxLength="100" required></input>
          </div>
          <div>
            Email Address:&nbsp;
            <input type="text" name="email" value={this.state.email}
            onChange={this.handleEmail}></input>
            &nbsp;<span className="Text-red" name="valid">{valid}</span>
          </div>
          <div>
            Flexible:&nbsp;
            <input type="checkbox" name="flexible" value={this.state.flexible}
            onChange={this.handleChange}></input>
          </div>
          <div>
            Days of Availability {star}:&nbsp;
            <input name="days" value={this.state.days}
            onChange={this.handleChange} required={star}></input>
          </div>
          &nbsp;<span className="Text-red" name="err">{err}</span>
          <div>
            <button type="submit" onClick={this.handleSubmit}>Save</button>
          </div>
      </header>
    </div>
    );
  }
}

export default App;
