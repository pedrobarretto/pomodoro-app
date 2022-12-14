import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export function Button(props: ButtonProps) {
  const { onPress, title } = props;
  return (
    <Pressable 
        style={
          ({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'rgb(243, 243, 243)'
                : 'white'
            }, styles.button, styles.elevation]
          
        } 
        onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#FF6565',
    fontWeight: '600'
  },
  button: {
    width: 170,
    height: 60,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 70
  },
  elevation: {
    elevation: 20,
    shadowColor: '#000',
  },
});