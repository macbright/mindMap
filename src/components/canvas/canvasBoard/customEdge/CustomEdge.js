import React, { memo } from 'react';
import EdgeText from './EdgeText';
import { getMarkerEnd, getBezierPath, Position } from 'react-flow-renderer';
// import styled from 'styled-components';

// const Path = styled.path`
// stroke-width: 2px; stroke: #8f92a2; }`;

const CustomEdge = memo(
  ({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition = Position.Bottom,
    targetPosition = Position.Top,
    data = {},
    labelShowBg,
    arrowHeadType,
    markerEndId,
    label,
  }) => {
    const { backgroundColor, position } = data;
    const path = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const text = label ? (
      <EdgeText
        label={label}
        labelShowBg={labelShowBg}
        backgroundColor={backgroundColor}
        {...{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, position }}
      />
    ) : null;

    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    return (
      <>
        <path d={path} className="react-flow__edge-path" markerEnd={markerEnd} />
        {text}
      </>
    );
  },
);

export default CustomEdge;
