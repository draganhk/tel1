import React  from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      fullnameVal: '' ,
      email: '',
      emailVal: true,
      flexible: false ,
      days: '',
      daysVal: '' ,
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    //fullname validation
    const nameValue = this.state.fullname;
    if (nameValue.length){
      this.setState({
        fullnameVal: nameValue.length>100 ? "Your Full Name is over 100 characters" : ""
      });
    } else{
      this.setState({
        fullnameVal: "THIS FIELD IS REQUIRED"
      });
    }


    //email validation
    const emailValue = this.state.email;
    if (emailValue.length){
      if (typeof emailValue !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        this.setState({
          emailVal: !pattern.test(emailValue) ? "Please enter valid email address" : ""
        });
      }
    }

    //if not flexible -> numeric validation
    const flexibleValue = this.state.flexible;
    const daysValue = this.state.days;
    if (!flexibleValue){
      if (daysValue.length===0){
        this.setState({
          daysVal:  "THIS FIELD IS REQUIRED"
        });
      } else{
        this.setState({
          daysVal: !isFinite(daysValue) ? "Your days of availability are not specified!" : ""
        });
      }
    }else{
      this.setState({
        daysVal: ""
      });
    }
  }

  render() {
    const strFullNameValid = this.state.fullnameVal;
    const strEmailValid = this.state.emailVal;
    const bIsCheckedIn = this.state.flexible;
    const strDaysValid = this.state.daysVal;

    return (
      <div className="App">
      <header className="App-header">
          <div className="Text-red">
            * Required Fields
          </div>
          <br></br>
          <div>
            Full Name* :&nbsp;
            <input type="text" name="fullname" value={this.state.fullname}
            onChange={this.handleChange} required></input>
            &nbsp;<span className="Text-red" name="fullname-valid">{strFullNameValid}</span>
          </div>
          <div>
            Email Address :&nbsp;
            <input type="text" name="email" value={this.state.email}
            onChange={this.handleChange}></input>
            &nbsp;<span className="Text-red" name="email-valid">{strEmailValid}</span>
          </div>
          <div>
            Flexible :&nbsp;
            <input type="checkbox" name="flexible" value={this.state.flexible}
            onChange={this.handleChange}></input>
          </div>
          <div>
            Days of Availability {bIsCheckedIn ? "" : "*"}:&nbsp;
            <input name="days" value={this.state.days}
            onChange={this.handleChange} required={bIsCheckedIn}></input>
            &nbsp;<span className="Text-red" name="days-valid">{strDaysValid}</span>
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>Save</button>
          </div>
      </header>
    </div>
    );
  }
}

export default App;
