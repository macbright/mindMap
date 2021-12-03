import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import { useDrop } from "react-dnd";
import {checkLeftNtop, checkImageId} from './hook';
import ReactFlow, { addEdge, Controls, MiniMap, removeElements } from 'react-flow-renderer';


import DrawShape from "../leftMenu/shapes/DrawShape"
import CustomNode from './NodeHandle';
import CustomEdge from './CustomEdge';



import styles from './canvasBoard.module.scss';

const edgeTypes = {
  custom: CustomEdge,
};



const CanvasBoard = ({ shapes }) => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [board, setBoard] = useState({})
  const [elements, setElements] = useState([]);

  useEffect(() => {
    
    console.log('elements ', elements)
    console.log('board ', board)
  }, [elements]);

  const onElementsRemove = (elementsToRemove) =>
  setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
  setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
  };

    
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const url = event.dataTransfer.getData('src');
    const id = event.dataTransfer.getData('id');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: checkImageId(),
      type,
      position,
      data: {label: <DrawShape  src={`data:image/png;base64, ${url}`}  />},
      arrowHeadType: '',
    };

     if (type === "custom" && !event.source )   moveShapes(id, newNode.id,  position.x, position.y)

     if (type === "custom" && type !== undefined) setElements((es) => es.concat(newNode));
  };



  const moveShapes = useCallback((id, imageId, left, top) => {
    if(!shapes){
      return null;
    }
    const selectShape = shapes?.filter((shape) => id === shape.id)
    setBoard(prevState => ({
      ...prevState, 
      [imageId]: {
        id: id,
        position: {x: left, y: top},
        type: "custom",
        url: selectShape[0]?.content
      }
    }))
  }, [board]);

    const NODE_TYPES = {
      yourType: CustomNode,
    };
    


    const onConnect = (params) => setElements(e => addEdge(params,e));

    return(
      <div className={styles.main} ref={reactFlowWrapper} >
                <ReactFlow 
                  className={styles.canvas}
                  elements={elements}
                  onLoad={onLoad}
                  onConnect={onConnect}
                  onElementsRemove={onElementsRemove}
                  onDrop={onDrop}
                  nodeTypes={NODE_TYPES}
                  onDragOver={onDragOver}
                  connectionLineStyle={{stroke: "#000", strokeWidth: 3}}
                  // connectionLineType="bezier"
                  minZoom={0.2}
                  edgeTypes={edgeTypes}
                  snapToGrid={true}
                  snapGrid={[16, 16]}
    

                    style={{
                        width: "80vw",
                        height: "85vh",
                      }}
                      
                      role={'Dustbin'}
                    >
                      <Controls />
                      {/* <Background
                        color="#888"
                        gap={16}
                        /> */}
                        <MiniMap 
                        nodeColor={n=>{
                            if(n.type === 'input') return 'blue';
                            
                            return '#FFCC00'
                        }} />
                    
                  </ReactFlow>

        </div>
    )
}

export default memo(CanvasBoard);

