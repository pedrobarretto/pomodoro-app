import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Countdown } from './components/Countdown';
import { CountdownProvider } from './contexts/CountdownContext';

export default function App() {
  return (
    <CountdownProvider>
      <View style={styles.container}>
        <Countdown />
      </View>
    </CountdownProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6565',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
