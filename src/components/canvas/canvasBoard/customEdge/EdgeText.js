import React, { memo, useRef, useState, FC, useLayoutEffect } from 'react';
import classnames from 'classnames';
// import styled from 'styled-components';
// import { getEdgeStart } from '../helpers/getEdgeStart';

// const Label = styled.text`
//   fill: white;
//   font-weight: 700;
// `;

// const TextRect = styled.rect`
//   fill: ${(props) => props.backgroundColor};
//   color: #fff;
// `;

const EdgeText = ({
  label,
  labelShowBg = true,
  labelBgPadding = [8, 4],
  labelBgBorderRadius = 4,
  children,
  className,
  backgroundColor = '#8f92a2',
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  position,
  ...rest
}) => {
  const edgeRef = useRef(null);
  const [edgeTextBbox, setEdgeTextBbox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const edgeTextClasses = classnames('react-flow__edge-textwrapper', className);
  const [x, y] = [9, 10];

  useLayoutEffect(() => {
    if (edgeRef.current) {
      const textBbox = edgeRef.current.getBBox();

      setEdgeTextBbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height,
      });
    }
  }, [label]);

  if (typeof label === 'undefined' || !label) {
    return null;
  }

  const handleClick = (event) => {
      console.log('handle clicked')
  }

  return (
    <g transform={`translate(${x} ${y})`} className={edgeTextClasses} {...rest} 
    onClick={handleClick}
    >
      {labelShowBg && (
        <div
          width={edgeTextBbox.width + 2 * labelBgPadding[0]}
          x={-labelBgPadding[0]}
          y={-labelBgPadding[1]}
          height={edgeTextBbox.height + 2 * labelBgPadding[1]}
          className="react-flow__edge-textbg"
          rx={labelBgBorderRadius}
          ry={labelBgBorderRadius}
          backgroundColor={backgroundColor}
          onClick={handleClick}
        />
      )}
      <div className="react-flow__edge-text" y={edgeTextBbox.height / 2} dy="0.3em" ref={edgeRef} 
          onClick={handleClick}
      >

      </div>
      {children}
    </g>
  );
};
export default memo(EdgeText);
