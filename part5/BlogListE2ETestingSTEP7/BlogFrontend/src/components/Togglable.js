import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

const Togglable = React.forwardRef((props, ref)  => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick = {toggleVisibility}> {props.buttonLabelFirst} </button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button id = 'cancel-button' onClick = {toggleVisibility}> {props.buttonLabelSecond} </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable