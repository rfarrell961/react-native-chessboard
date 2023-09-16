import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';
import Chessboard, { ChessboardRef } from 'react-native-chessboard';

export default function App() {
  const ref = useRef<ChessboardRef>(null);
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    (async () => {
      await ref.current?.move({ from: 'e2', to: 'e4' });
      await ref.current?.move({ from: 'e7', to: 'e5' });
      await ref.current?.move({ from: 'd1', to: 'f3' });
      await ref.current?.move({ from: 'a7', to: 'a6' });
      await ref.current?.move({ from: 'f1', to: 'c4' });
      await ref.current?.move({ from: 'a6', to: 'a5' });
      // await ref.current?.move({ from: 'f3', to: 'f7' });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Chessboard
        ref={ref}
        onMove={({ state }) => {
          if (state.in_checkmate) {
            console.log('Life goes on.');
          }
        }}
        flipped={flipped}
      />
      <Button title='flip' onPress={() => setFlipped(!flipped)}/>
      <Text style={{color: "white"}}>{flipped.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
