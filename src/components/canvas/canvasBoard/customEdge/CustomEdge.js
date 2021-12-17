import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EdgeText from './EdgeText';
import { getMarkerEnd, getBezierPath, Position } from 'react-flow-renderer';

           /*eslint-disable */
                      /*eslint-disable display-name */
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


CustomEdge.propTypes = {
  sourceX: PropTypes.number,
    sourceY: PropTypes.number,
    targetX: PropTypes.number,
    targetY: PropTypes.number,
    sourcePosition: PropTypes.number,
    targetPosition: PropTypes.number,
    data: PropTypes.object,
    labelShowBg: PropTypes.string,
    arrowHeadType: PropTypes.string,
    markerEndId: PropTypes.string,
    label: PropTypes.string,
};


export default CustomEdge;
