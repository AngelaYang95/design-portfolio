import React from 'react'
import PropTypes from 'prop-types'
import {
  TransitionConsumer,
  transitions,
} from '../components/TransitionContext'

const TransitionContainer = class extends React.Component {
  componentDidMount() {
    let { transition, onEnter, onExit } = this.props
    if (transition.type === transitions.enter.type) {
      onEnter(transition.path)
    } else {
      onExit(transition.path)
    }
  }

  componentDidUpdate() {
    let { transition, onEnter, onExit } = this.props
    if (transition.type === transitions.enter.type) {
      onEnter(transition.path)
    } else {
      onExit(transition.path)
    }
  }

  render() {
    let { transition, enter, exit, className, children } = this.props

    if (transition.type === transitions.enter.type) {
      return (
        <div
          className={`transition-group ${className} ${
            transition.type
          } ${enter.join(' ')}`}
        >
          {children}
        </div>
      )
    } else {
      return (
        <div
          className={`transition-group ${className} ${
            transition.type
          } ${exit.join(' ')}`}
        >
          {children}
        </div>
      )
    }
  }
}

TransitionContainer.defaultProps = {
  enter: [],
  exit: [],
  onEnter: () => {},
  onExit: () => {},
}

TransitionContainer.propTypes = {
  enter: PropTypes.array,
  exit: PropTypes.array,
  className: PropTypes.string,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
}

/* Wrap our transition container in a consumer and pass down context as props. */
const Transition = props => {
  return (
    <TransitionConsumer>
      {({ transition }) => (
        <TransitionContainer {...props} transition={transition} />
      )}
    </TransitionConsumer>
  )
}

export default Transition
