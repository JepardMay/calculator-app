import React, { useCallback, useState, useContext, useEffect, useRef } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

interface Props {
  setHistoryState: (boolean: boolean) => void;
}

const Output = ({ setHistoryState }: Props) => {
  const historyRef = useRef<HTMLDivElement | null>(null);
  const { state } = useContext(CalculatorContext);
  const { previousResult } = state;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const scrollToBottom = () => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, offset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [previousResult]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="history"
      ref={ historyRef }
      style={{ top: position.y, left: position.x }}
    >
      <div className="history__header">
        <button className="history__close-btn" onClick={ () => setHistoryState(false) } aria-label="Close History">
          <span>X</span>
        </button>
        <button
          type="button"
          className="history__drag-btn"
          aria-label="Click to move" 
          onMouseDown={ handleMouseDown }
        ></button>
      </div>
      { previousResult.map((result) => {
        return (
          <p key={ result }>
            {result}
          </p>
        );
      })}
    </div>
  )
}

export default Output;
