import React, { useContext, useEffect, useRef } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';
import useDraggable from '../hooks/useDraggable';

interface Props {
  setHistoryState: (boolean: boolean) => void;
}

const Output = ({ setHistoryState }: Props) => {
  const historyRef = useRef<HTMLDivElement | null>(null);
  const { state } = useContext(CalculatorContext);
  const { previousResult } = state;
  const { 
    position, 
    handleMouseDown, 
    handleTouchStart, 
    handleMouseMove, 
    handleTouchMove, 
    handleMouseUp, 
    handleTouchEnd 
  } = useDraggable();

  const scrollToBottom = () => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [previousResult]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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
          onTouchStart={ handleTouchStart }
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
