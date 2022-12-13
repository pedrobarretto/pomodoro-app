import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

interface ButtonProps {
  onPress: () => void;
}

export function Button(props: ButtonProps) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}