import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export function snapToGrid(x, y) {
    const snappedX = Math.round(x / 32) * 32
    const snappedY = Math.round(y / 32) * 32
    return [snappedX, snappedY]
  }


export function checkLeftNtop(position){

  if(isNaN(position) ){
    return 0
  }
  return position;
}

export function checkImageId(){
    return uuidv4()
}

export const imageDialogue = (left, top, handleDelete) => {
  return (
      <div style={{ 
          backgroundColor: 'white',
          position: 'absolute',
          height: '200px',
          width: '100px',
          zIndex: '200',
          borderRadius: '15px',
          padding: '25px',
          transform: `translate3d(${left + 100}px, ${top + 300}px, 0)`,
          }}>
              <p onClick={handleDelete}>
                  delete
              </p>
              <p>
                  rename
              </p>
              
  </div>)
 
}

export const saveShapes = (elements) => {
  let newShapes = []
  elements.map((element) => {
    if(element.type){
      let shape = {
        "DocumentShapeId": element.id,
        "ShapeId": element.imageId,
        "Name": element.id,
        "PositionX": element.position.x,
        "PositionY": element.position.y, 
        "width": 50,
        "Height": 100,
        "Radius": null
      }
      newShapes.push(shape)
    }
  })
  return newShapes;
}


export const saveShapesRelations = (elements) => {
  let newRelations = []
  elements.map((element) => {
    if(element.source){
      let relation = {
        "SourceDocumentShapeId": element.source,
        "DestinationDocumentShapeId": element.target,
        "Name": element.label,
      }
      newRelations.push(relation)
    }
  })
  return newRelations;
}

export const getShapesAndRelations = (data, DrawShape) => {
  let elements = [];
  const {relatedShapes, shapes} = data;
  relatedShapes.$values.forEach((relation) => {
    let val = {
      id: `reactflow__${relation.sourceDocumentShapeId}null-${relation.destinationDocumentShapeId}null`,
      arrowHeadType: "arrowclosed",
      source: relation.sourceDocumentShapeId,
      target: relation.destinationDocumentShapeId,
      label: relation.name,
      style: {stroke: "#000", strokeWidth: 2, color: "#000"},
      sourceHandle: null,
      targetHandle: null,
    }
    elements.push(val)
  })

  shapes.$values.forEach((shape) => {
    let val = {
      connectable: true,
      id: shape.id,
      imageId: shape.shapeId,
      name: shape.name,
      position: {x: shape.positionX, y: shape.positionY},
      type: "customNode",
      data: {label: <DrawShape  src={`data:image/png;base64, ${shape.content}`}    name={shape.name}/>}
    }
    elements.push(val)
  })

  return elements
}
