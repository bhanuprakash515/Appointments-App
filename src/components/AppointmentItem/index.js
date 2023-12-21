import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, toggleButtonEl} = props
  const {title, date, id, isStarred} = appointmentItem

  const starredBtn = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleButtonEl(id)
  }

  return (
    <li className="list-item-container">
      <div className="item-row-container">
        <p className="item-heading">{title}</p>
        <button
          className="item-btn"
          type="button"
          aria-label="Save"
          data-testid="star"
        >
          <img
            src={starredBtn}
            className="star-img"
            alt="star"
            onClick={onClickStar}
          />
        </button>
      </div>
      <p className="date-item">{date}</p>
    </li>
  )
}

export default AppointmentItem
