import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import ReactFlow, { addEdge, Controls, MiniMap, removeElements, updateEdge } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';

import { getElements } from '../../../store/slice/canvasElement'


import DrawShape from "../leftMenu/shapes/DrawShape"
import CustomNode from './NodeHandle';
import CustomEdge from './customEdge/CustomEdge';

import { checkImageId} from './hook';



import styles from './canvasBoard.module.scss';

const edgeTypes = {
  custom: CustomEdge,
};


const CanvasBoard = ({ shapes }) => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [board, setBoard] = useState({})

  const [elements, setElements] = useState([]);

  const [imageName, setImageName] = useState('')

  useEffect(() => {
    
    console.log('elements ', elements)
    console.log('board ', board)

  }, [elements]);

  useEffect(() => {
    
    console.log('elements on name change ', elements)
    

  }, [imageName, setImageName]);

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
    const name = event.dataTransfer.getData('alt')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: checkImageId(),
      type,
      position,
      data: {label: <DrawShape  src={`data:image/png;base64, ${url}`}  name={name} elements={elements} 
      setElements={setElements}  name={name}/>},
      connectable: true,
      name: name,
    };
    
     if (type === "customNode" )   moveShapes(id, newNode.id,  position.x, position.y, newNode.name)
     if ( type === "customNode"  ) setElements((es) => es.concat(newNode));
  };



  const moveShapes = useCallback((id, imageId, left, top, name) => {
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
        url: selectShape[0]?.content,
        name: name
      }
    }))
  }, [board]);

    const NODE_TYPES = {
      yourType: CustomNode,
    };
    
    const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));


    const onConnect = (params) => setElements((els) => {
      const edge = {
       ...params,
       arrowHeadType: 'arrowclosed',
       arrowHeadColor: "#000",
       label: "new connection added",
       style: {
         stroke: '#000',
         strokeWidth: 2,
         color: '#000'
       }
      };
      console.log('edge: ', edge, 'els: ', els)
      return addEdge(edge, els);
    });

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
                  onEdgeUpdate={onEdgeUpdate}
                  minZoom={0.2}
                  edgeTypes={edgeTypes}
                  arrowHeadColor= "#8f92a2"
                  snapToGrid={true}
                  snapGrid={[16, 16]}
    

                    style={{
                        width: "80vw",
                        height: "85vh",
                      }}
                      
                      role={'Dustbin'}
                    >
                      <Controls />
                  
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

