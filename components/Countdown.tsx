import { View, Text, Button, StyleSheet } from 'react-native';
import { useCountdown } from '../hooks/useCountdown';

export function Countdown() {
  const { 
    isActive, 
    hasFinished,
    resetCountdown, 
    startCountdown, 
    minutes, 
    seconds,
    startBreakTime
  } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  return (
    <View>
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

      { hasFinished ? (
        <Button onPress={startBreakTime} title='Iniciar descanso' />
      ) : (
        <>
          { isActive ? (
            <Button onPress={resetCountdown} title='Abandonar ciclo' />
          ) : (
            <Button onPress={startCountdown} title='Iniciar um ciclo'/>
          ) }
        </>
      ) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 45
  }
});