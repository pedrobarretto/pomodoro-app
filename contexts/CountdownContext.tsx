import { createContext, ReactNode, useEffect, useState } from "react";
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

  function startCountdown() {
    setTime(PRIMAY_CICLE);
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(PRIMAY_CICLE);
    setHasFinished(false);
  }

  function startBreakTime() {
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