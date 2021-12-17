import React, {useState, useEffect, memo, useRef} from 'react';
import ReactFlow, { addEdge, Controls, MiniMap, removeElements, updateEdge } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { useParams} from "react-router-dom";
import html2canvas from "html2canvas";


import { useSaveDocumentShapesMutation, 
  useSaveDocumentShapesRelationMutation, useGetDocumentByIdQuery} from '../../../store/services/document';
import DrawShape from "../leftMenu/shapes/DrawShape"
import CustomNode from './NodeHandle';
import CustomEdge from './customEdge/CustomEdge';
import {savingElements, savedElements, savePdfSrc } from '../../../store/slice/canvasElement';


import { checkImageId, saveShapesRelations, saveShapes, getShapesAndRelations} from './hook';



import styles from './canvasBoard.module.scss';

const edgeTypes = {
  custom: CustomEdge,
};


const CanvasBoard = () => {
  const {id } = useParams();
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [saveDocumentShapes, { isLoading: shapeSaving, isSuccess: shapesSuccess }] = useSaveDocumentShapesMutation();
  const [saveDocumentShapesRelation, { isLoading: relationsSaving, isSuccess: relationSuccess }] = useSaveDocumentShapesRelationMutation();
  const { data } = useGetDocumentByIdQuery(id);
  const [src, setSrc] = useState("");

  const [elements, setElements] = useState([]);


  useEffect(() => {
    const newElements = {
      payload: {
        "DocumentShapes" :  saveShapes(elements),
      },
      documentId: id
    }
    const newRelations = {
      payload: {
        "Relations" :  saveShapesRelations((elements)),
      },
      documentId: id
    }
    console.log(newRelations, newElements)
    if(saveShapes(elements).length > 0) saveDocumentShapes(newElements);
    if(saveShapesRelations(elements).length > 0) saveDocumentShapesRelation(newRelations)

  }, [elements, setElements]);

  useEffect(() => {
    if(data) console.log('datass: ', getShapesAndRelations(data, DrawShape))
    if(data) setElements(getShapesAndRelations(data, DrawShape))
  }, [data])

  useEffect(() => {
    dispatch(savePdfSrc(src ))
  }, [src])

  useEffect(() => {
    if (reactFlowInstance && elements.length) {
      reactFlowInstance.fitView();
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        document.body.appendChild(canvas);
        var image = new Image();
        image.id = "pic";
        image.src = canvas.toDataURL();
        setSrc(image.src);
        console.log("canvasss", image);
      });
    }
  }, [reactFlowInstance, elements]);



  useEffect(() => {
    dispatch(savingElements(shapeSaving | relationsSaving ))
    dispatch(savedElements(shapesSuccess | relationSuccess))
  }, [shapeSaving, relationsSaving, shapesSuccess, relationSuccess])


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
      data: {label: <DrawShape  src={`data:image/png;base64, ${url}`}    name={name}/>},
      imageId: id,
      connectable: true,
      name: name,
    };
     if ( type === "customNode"  ) setElements((es) => es.concat(newNode));
  };

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
      return addEdge(edge, els);
    });

    return(
      <div className={styles.main} ref={reactFlowWrapper} id="capture" >
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

