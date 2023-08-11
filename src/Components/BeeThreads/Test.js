import React, { useEffect, useReducer, useRef } from "react";

const initialState = { running: 0, time: 0 };
const reducer = (state, action) => {
  if (action.type === "start") {
    return {...state, running : true}
  } else if (action.type === "stop") {
    return {...state,running : false}
  }else if(action.type === 'tick'){
    return {...state , time : state.time + 1}
  }else if(action.type === 'reset'){
    return {...state, time : 0}
  }
  else{
    throw new Error()
  }
};
export function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() =>{
    if(!state.running){
        return;
    }
    idRef.current = setInterval(() => dispatch({type:'tick'}),1000)
    return () =>{
        clearInterval(idRef.current);
        idRef.current = 0
    }
  },[state.running])

  return (
    <div className="App">
      <h1>{state.time}</h1>
      <div>
      <button onClick={() => dispatch({ type: 'start' })}>
        Start
      </button>
      <button onClick={() => dispatch({ type: 'stop' })}>
        Stop
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
    </div>
  );
}

export default Test;
