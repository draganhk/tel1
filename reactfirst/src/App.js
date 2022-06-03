import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Full Name:
          <input type="text" name="fullname"></input>
        </div>
        <div>
          Email Address:
          <input type="text" name="email"></input>
        </div>
        <div>
          Flexible:
          <input type="checkbox"></input>
        </div>
        <div>
          Days of Availability:
          <input type="number"></input>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </header>
    </div>
  );
}

export default App;
