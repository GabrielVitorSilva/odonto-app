import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Teste2Props {}

const Teste2 = (props: Teste2Props) => {
  return (
    <View style={styles.container}>
      <Text>Teste2</Text>
    </View>
  );
};

export default Teste2;

const styles = StyleSheet.create({
  container: {}
});
