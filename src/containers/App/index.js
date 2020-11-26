import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'; 
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  clockBox: {
    border: '4px black solid',
    padding: '20px 100px',
    borderRadius: '10px',
    width: '300px',
  },
  clockBoxRed: {
    border: '4px red solid',
    padding: '20px 100px',
    borderRadius: '10px',
    width: '300px',
  },
  arrows: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '10px 0px',
  },
}));

const App = () => {
  const classes = useStyles();
  const [timerOn, setTimerOn] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [counterId, setCounterId] = useState(null);
  const [limit, setLimit] = useState(null);
  const [clock, setClock] = useState(null);
  const [initSession, setInitSession] = useState(false);
  const [initBreak, setInitBreak] = useState(false);

  const formatter = value => {
    let tempArray = value.toString().split('');
    if(tempArray.length === 1) {
      tempArray.unshift('0');
      return tempArray.join('');
    }
    return value;
  };

  const counter = () => {
    let actual = initSession ? sessionTime * 60 : breakTime * 60;
    let minute = initSession ? sessionTime : breakTime;
    let seconds = 60;
    let contador = setInterval(() => {
      setCounterId(contador);
      if(seconds % 60 === 0) {
        seconds = 60;
        minute--;
      }
      actual--;
      seconds--;
      setLimit(actual);
      setClock(`${formatter(minute)}:${formatter(seconds)}`);
      if (actual <= 0) {
        clearInterval(contador);
        //setInitSession(false);
      }
    },1000);
  };

  const handlerStartTimer = () => {
    setInitSession(true);
  }

  useEffect(() => {
    setClock(`${formatter(sessionTime)}:00`);
  },[]);

  useEffect(() => {
    initSession && counter();
  },[initSession]);

  useEffect(() => {
    clearInterval(counterId);
  },[timerOn]);

  useEffect(() => {
    if (limit === 0 && initSession) {
      counter();
      setInitSession(false);
      setInitBreak(true);
    }
  },[limit]);

  const handlerStopTimer = () => {
    setTimerOn(true)
  };

  const handleUpMinuteBreak = () => {
    setBreakTime(breakTime + 1);
  };

  const handleDownMinuteBreak = () => {
    if(breakTime > 0) {
      setBreakTime(breakTime - 1);
    }
  };

  const handleUpMinuteSession = () => {
    setSessionTime(sessionTime + 1);
    setClock(`${formatter(sessionTime + 1)}:00`);
  };

  const handleDownMinuteSession = () => {
    if(sessionTime > 0) {
      setSessionTime(sessionTime - 1);
      setClock(`${formatter(sessionTime - 1)}:00`);
    }
  };

  const handleResetAll = () => {
    setClock('25:00');
    setTimerOn(false);
    setSessionTime(25);
    setBreakTime(5);
    setCounterId(null);
    setLimit(null);
    setInitSession(false);
    setInitBreak(false);
  };

  const isBreak = initBreak ? 'red' : 'black';
  const styler = {
    color: isBreak,
  };
  //const beep = document.getElementById('beep');
  //if (initBreak) beep.play();

  return(
    <Grid direction="column" container className="hannah-parent">
      <Grid item xs={12}>
        <h1>25 + 5 Clock</h1>
      </Grid>
      <Grid xs={12} container spacing={0}>
        <Grid item xs={6}>
          <p id="break-label" className="p-clock">Break Length</p>
          <div className={classes.arrows} >
            <IconButton id="break-decrement" onClick={() => handleDownMinuteBreak()} >
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
              <span id="break-length" className="number-clock">{breakTime}</span>
            <IconButton id="break-increment" onClick={() => handleUpMinuteBreak()} >
              <ArrowUpwardIcon fontSize="large" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={6}>
          <p id="session-label" className="p-clock">Session Length</p>
          <div className={classes.arrows}>
            <IconButton id="session-decrement" onClick={() => handleDownMinuteSession()} >
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
              <span id="session-length" className="number-clock">{sessionTime}</span>
            <IconButton id="session-increment" onClick={() => handleUpMinuteSession()} >
              <ArrowUpwardIcon fontSize="large" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} className={initBreak ? classes.clockBoxRed : classes.clockBox}>
        <h1 id="timer-label" style={styler}>{initBreak ? 'Break' : 'Session'}</h1>
        <h1 id="time-left" style={styler}>{clock}</h1>
      </Grid>
      <Grid item xs={12} className="hannah-container">
        <IconButton id="start_stop" aria-label="delete" onClick={() => handlerStartTimer()}>
          <PlayArrowIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handlerStopTimer()}>
          <PauseIcon fontSize="large" />
        </IconButton>
        <IconButton id="reset" aria-label="delete" onClick={() => handleResetAll()}>
          <RefreshIcon fontSize="large" />
        </IconButton>
      </Grid>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </Grid>
  )
}

export default App
