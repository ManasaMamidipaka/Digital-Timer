// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedInSeconds: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onDecreaseTimer = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncreaseTimer = () =>
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimit, timerElapsedInSeconds} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0

    return (
      <div className="timer-limit-container">
        <p className="limit-label">Set Timer Limit </p>
        <div className="timer-limit">
          <button
            disabled={isButtonDisabled}
            className="limit-button"
            type="button"
            onClick={this.onDecreaseTimer}
          >
            -
          </button>
          <div className="limit-label-container">
            <p className="limit-value">{timerLimit}</p>
          </div>
          <button
            className="limit-button"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onIncreaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeInSeconds = () => {
    const {timerLimit, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timerElapsedInSeconds, timerLimit} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerLimit = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-limit-controller">
        <button
          className="timer-limit-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImage}
            className="timer-icon"
            alt={startOrPauseText}
          />
          <p className="timer-label">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          type="button"
          className="timer-limit-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-icon"
          />
          <p className="timer-label"> Reset </p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTime = () => {
    const {timerLimit, timerElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timerElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading"> Digital Timer </h1>
        <div className="digital-timer-container">
          <div className="timer-container">
            <div className="elapsed-timer-container">
              <h1 className="elapsed-time">{this.getElapsedSecondsInTime()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerLimit()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
