import React from 'react'
const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}
const Notification = ({ type, message }) => {
  if (type === null) {
    return null
  }
  if (type === 'error')
    return (
      <div className="error" style={error}>
        {message}
      </div>
    )
  if (type === 'success')
    return (
      <div className="success" style={success}>
        {message}
      </div>
    )
}
export default Notification