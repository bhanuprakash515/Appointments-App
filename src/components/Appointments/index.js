import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentLists: [],
    title: '',
    date: '',
    isFiltered: false,
  }

  onAddNewAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const addNewAppointment = {
      id: uuidv4(),
      title,
      date: newDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, addNewAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  toggleButtonEl = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachUser => {
        if (eachUser.id === id) {
          return {...eachUser, isStarred: !eachUser.isStarred}
        }
        return eachUser
      }),
    }))
  }

  onClickFilter = () => {
    const {isFiltered} = this.state

    this.setState(prevState => ({
      isFiltered: !prevState.isFiltered,
    }))
  }

  getAppointments = () => {
    const {appointmentLists, isFiltered} = this.state
    if (isFiltered) {
      return appointmentLists.filter(each => each.isFiltered === true)
    }
    return appointmentLists
  }

  render() {
    const {title, date, isFiltered} = this.state
    const filteredClassName = isFiltered ? 'filter-filled' : ''
    const filteredAppointments = this.getAppointments()

    return (
      <div className="container">
        <div className="line-cont">
          <div className="card-container">
            <div className="input-container">
              <form onSubmit={this.onAddNewAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="Title" className="label">
                  TITLE
                </label>
                <br />
                <input
                  type="Title"
                  id="title"
                  className="title-input"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <br />
                <label htmlFor="Date" className="label">
                  DATE
                </label>
                <br />
                <input
                  type="Date"
                  id="date"
                  className="title-input"
                  placeholder="Date"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <br />
                <button className="button" type="submit" data-testid="star">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="app-image"
            />
          </div>
          <hr className="line-break" />
          <div className="name-container">
            <h1 className="heading-2">Appointments</h1>
            <button
              className={`button-2 ${filteredClassName}`}
              type="button"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="un-order-list-container">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                appointmentItem={eachAppointment}
                key={eachAppointment.id}
                toggleButtonEl={this.toggleButtonEl}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
