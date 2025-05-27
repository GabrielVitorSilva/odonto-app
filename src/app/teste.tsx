
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface Teste1Props {}

const Teste1 = (props: Teste1Props) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Teste1</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Teste2');
        }}
      />
    </View>
  );
};

export default Teste1;

const styles = StyleSheet.create({
  container: {}
});
