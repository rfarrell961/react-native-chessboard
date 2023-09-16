import React from 'react';
import { useChessboardProps } from '../context/props-context/hooks';

import { useBoard } from '../context/board-context/hooks';
import { usePieceRefs } from '../context/board-refs-context/hooks';

import Piece from './piece';
import { useReversePiecePosition } from '../notation';

const Pieces = React.memo(() => {
  const board = useBoard();
  const refs = usePieceRefs();
  const { pieceSize, flipped } = useChessboardProps();
  const { toPosition } = useReversePiecePosition();



  return (
    <>
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            const square = toPosition({
              x: (flipped ? 7- x : x ) * pieceSize,
              y: (flipped ? 7 - y : y ) * pieceSize,
            });

            return (
              <Piece
                ref={refs?.current?.[square]}
                key={`${flipped ? 7- x : x}-${flipped ? 7 - y : y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={flipped ? {x: 7 - x, y: 7 - y} : { x, y }}
                square={square}
                size={pieceSize}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
});

export { Pieces };
