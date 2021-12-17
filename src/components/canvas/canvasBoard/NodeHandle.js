import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = () => {

  
  
  return <>
    ...
    <Handle
      type="target"
      position={Position.Left}
      style={{ // Make the handle invisible and increase the touch area
        background: 'transparent',
        zIndex: 999,
        border: 'none',
        width: '20px',
        height: '20px',
      }}
    />
   
  </>;
}

export default  CustomNode;