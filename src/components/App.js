import React, { Component } from 'react';
// import logo from './logo.svg';
import '../css/App.css';
import AddAppointments from './AddAppointment'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'
import { without, findIndex } from 'lodash'



class App extends Component {
  constructor() {
    super();

    this.state = {
      myName: "Dhanush kumar",
      myAppointments: [],
      formDisplay: false,
      LastIndex: 0,
      orderBy: 'ownerName',
      orderDir: 'asc',
      queryText: ''
    }
    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
    this.changeOrder = this.changeOrder.bind(this)
    this.searchApts = this.searchApts.bind(this)
    this.updateInfo = this.updateInfo.bind(this)


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
  addAppointment(apt) {
    let tempapts = this.state.myAppointments
    apt.aptId = this.state.LastIndex
    tempapts.unshift(apt)
    this.setState({
      myAppointments: tempapts
      , LastIndex: this.state.LastIndex + 1
    });
    this.toggleForm()

  }
  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }
  searchApts(query) {
    this.setState({
      queryText: query
    })
  }

  updateInfo(name, value, id) {
    let tempapts = this.state.myAppointments
    let aptInd = findIndex(this.state.myAppointments, { aptId: id });

    tempapts[aptInd][name] = value;
    this.setState({
      myAppointments: tempapts
    })
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
    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.order === 'asc') {
      order = -1
    }
    else {
      order = 1
    }

    filteredApts = filteredApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * order;

      }
      else {
        return 1 * order
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    })
    return (



      < main className="page bg-white" id="petratings" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} addAppointment={this.addAppointment} />
                <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments appointments={filteredApts} deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
