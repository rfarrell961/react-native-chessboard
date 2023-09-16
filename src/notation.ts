import type { Square } from 'chess.js';
import { useCallback } from 'react';
import { useChessboardProps } from './context/props-context/hooks';

import type { Vector } from './types';

const useReversePiecePosition = () => {
  const { pieceSize, flipped } = useChessboardProps();

  const toTranslation = useCallback(
    (to: Square) => {
      'worklet';
      const tokens = to.split('');
      const col = tokens[0];
      const row = tokens[1];
      if (!col || !row) {
        throw new Error('Invalid notation: ' + to);
      }
      const indexes = {
        x: col.charCodeAt(0) - 'a'.charCodeAt(0),
        y: parseInt(row, 10) - 1,
      };

      if (!flipped)
      {
        return {
          x: indexes.x * pieceSize,
          y: 7 * pieceSize - indexes.y * pieceSize,
        };
      }
      else
      {
        return {
          x: 7 * pieceSize - indexes.x * pieceSize,
          y: indexes.y * pieceSize,
        };
      }
      
    },
    [pieceSize, flipped]
  );

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const col = flipped ? String.fromCharCode(104 - Math.round(x / pieceSize)) : String.fromCharCode(97 + Math.round(x / pieceSize));
      const row = flipped ? `${1 + Math.round(y / pieceSize)}` : `${8 - Math.round(y / pieceSize)}`;
      return `${col}${row}` as Square;
    },
    [pieceSize, flipped]
  );

  return { toPosition, toTranslation };
};

export { useReversePiecePosition };
