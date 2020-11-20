import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const initTimer = duracion => {
    let actual = 1
    const counter = setInterval(()=>{
      if (actual > duracion){
        clearTimeout(counter)
      }else{
        setSessionLength(sessionLength - actual);
        console.log(actual++)
      }
    },1000)
  };

  useEffect(() => {
  },[]);

  const handlerStartTimer = () => {
    initTimer(sessionLength);
  };

  return(
    <Grid direction="column" container>
      <Grid item xs={12}>
        <h1>25 + 5 Clock</h1>
      </Grid>
      <Grid item xs={6}>
        <p>Break Length</p>
        <div>
          <FontAwesomeIcon onClick={() => setBreakLength(breakLength - 1)} icon={['fas', 'arrow-down']} />
          {breakLength}
          <FontAwesomeIcon onClick={() => setBreakLength(breakLength + 1)} icon={['fas', 'arrow-up']} />
        </div>
      </Grid>
      <Grid item xs={6}>
        <p>Session Length</p>
        <div>
          <FontAwesomeIcon onClick={() => setSessionLength(sessionLength - 1)} icon={['fas', 'arrow-down']} />
          {sessionLength}
          <FontAwesomeIcon onClick={() => setSessionLength(sessionLength + 1)} icon={['fas', 'arrow-up']} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <h1>Session</h1>
        <h1>{sessionLength}</h1>
      </Grid>
      <Grid item xs={12}>
        <FontAwesomeIcon onClick={() => handlerStartTimer()} icon={['fas', 'play']} />
        <FontAwesomeIcon icon={['fas', 'pause']} />
        <FontAwesomeIcon icon={['fas', 'history']} />
      </Grid>
    </Grid>
  )
}

export default App
