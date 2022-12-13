import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useCountdown } from '../hooks/useCountdown';
import { BREAK_CICLE, PRIMAY_CICLE } from '../utils/times';
import Tomato from './images/tomato.svg';
import { Loader } from './Loader/Loader';

export function Countdown() {
  const { 
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown,
    minutes,
    seconds,
    startBreakTime,
  } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  return (
    <View>
      <View style={styles.tomato}>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.number}>{minuteLeft}</Text>
            <Text style={styles.number}>{minuteRight}</Text>
          </View>
          <Text style={styles.number}>:</Text>
          <View style={styles.container}>
            <Text style={styles.number}>{secondLeft}</Text>
            <Text style={styles.number}>{secondRight}</Text>
          </View>
        </View>
      </View>

      { isActive ? (
        <Button onPress={resetCountdown} title='Abandonar ciclo' />
      ) : (
        <>
          <Button onPress={startCountdown} title='Iniciar um ciclo'/>
          <Button onPress={startBreakTime} title='Iniciar descanso'/>
        </>
      ) }
    </View>
  )
}

const styles = StyleSheet.create({
  tomato: {
    borderRadius: 315 / 2,
    backgroundColor: '#FF3232',
    height: 315,
    width: 315,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 45,
    color: 'white'
  },
  button: {
    backgroundColor: 'white',
    color: '#FF6565',
    width: 170,
    padding: 15,
    marginBottom: 15
  }
});