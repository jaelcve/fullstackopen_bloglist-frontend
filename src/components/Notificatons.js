import React from 'react'

const Notification = ({ message, isError }) => {

  const errorMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  if (isError) {
    return (
      <div style={errorMessage}>
        {message}
      </div>
    )
  } else {
    return (
      <div style={successMessage}>
        {message}
      </div>
    )
  }
}

export default Notification
