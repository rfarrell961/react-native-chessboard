import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useChessboardProps } from '../../context/props-context/hooks';

import { useBoardOperations } from '../../context/board-operations-context/hooks';
import { useChessEngine } from '../../context/chess-engine-context/hooks';

import { PlaceholderDot } from './PlaceholderDot';

const SuggestedDots: React.FC = React.memo(() => {
  const { flipped } = useChessboardProps();
  const chess = useChessEngine();
  const { moveTo, selectableSquares } = useBoardOperations();
  const board = useMemo(() => chess.board(), [chess]);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {board.map((row, y) =>
        row.map((_, x) => {
          return (
            <PlaceholderDot
              key={`${flipped ? (7 - x): x}-${flipped ? (7 - y) : y}`}
              x={flipped ? (7 - x) : x}
              y={flipped ? (7 - y) : y}
              selectableSquares={selectableSquares}
              moveTo={moveTo}
            />
          );
        })
      )}
    </View>
  );
});

export { SuggestedDots };
