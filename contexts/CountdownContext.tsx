import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from 'react-native';
import { BREAK_CICLE, PRIMAY_CICLE } from '../utils/times';

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  resetCountdown: () => void;
  startCountdown: () => void;
  startBreakTime: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(PRIMAY_CICLE);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const appState = useRef(AppState.currentState);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (x) => {
      handleAppStateChange(x);
      sub.remove();
    });
  }, []);

  const handleAppStateChange = async (nextAppState: string | undefined) => {
    if (appState.current.match(/inactive|background/) &&
      nextAppState === "active") {
      // We just became active again: recalculate elapsed time based 
      // on what we stored in AsyncStorage when we started.
      const elapsed = await getElapsedTime();
      // Update the elapsed seconds state
      setElapsed(elapsed as unknown as number);
    }
    const nAs = nextAppState as AppStateStatus;
    appState.current = nAs;
  };
  const getElapsedTime = async () => {
    try {
      const startTime = getStartTime();
      const now = new Date();
      const newTime = differenceInSeconds(now, Date.parse(startTime as string));
      setTime(newTime);
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
         setTime(time - 1);
       }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  const recordStartTime = () => {
    try {
      const now = new Date();
      window.localStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      console.warn(err);
    }
  };

  const clearStartTime = () => {
    window.localStorage.removeItem('@start_time');
  }

  const getStartTime = () => {
    return window.localStorage.getItem('@start_time');
  }

  function startCountdown() {
    recordStartTime();
    setTime(PRIMAY_CICLE);
    setIsActive(true);
  }

  function resetCountdown() {
    clearStartTime();
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(PRIMAY_CICLE);
    setHasFinished(false);
  }

  function startBreakTime() {
    recordStartTime();
    setTime(BREAK_CICLE);
    setIsActive(true);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <CountdownContext.Provider value={{
      isActive,
      resetCountdown,
      hasFinished,
      startCountdown,
      minutes,
      seconds,
      startBreakTime,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}