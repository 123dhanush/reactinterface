import React, { Component } from 'react';
// import logo from './logo.svg';
import '../css/App.css';
import AddAppointments from './AddAppointment'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'
import { without } from 'lodash'



class App extends Component {
  constructor() {
    super();

    this.state = {
      myName: "Dhanush kumar",
      myAppointments: [],
      formDisplay: false,
      LastIndex: 0
    }
    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.toggleForm = this.toggleForm.bind(this)

  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }
  deleteAppointment(apt) {
    let tempapts = this.state.myAppointments
    tempapts = without(tempapts, apt)

    this.setState({ myAppointments: tempapts });
  }
  componentDidMount() {
    fetch('./data.json').then(response => response.json()).then(result => {
      const apts = result.map((item) => {
        item.aptId = this.state.LastIndex;
        this.setState({ LastIndex: this.state.LastIndex + 1 });
        return item;
      });
      this.setState({ myAppointments: apts });


    })
  }

  render() {

    return (



      < main className="page bg-white" id="petratings" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
