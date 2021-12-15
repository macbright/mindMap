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

export function checkImageId(imageId){
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
        "Name": element.name,
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

// data: {label: },

// connectable: true
// data: {label: {…}}
// id: "ec5c3c75-8721-4cf1-9e6c-f63c6a5ddab8" // id on canvas
// imageId: "ec5c3c75-8721-4cf1-9"   // the Shape ID
// name: "App-Service-Domains"
// position: {x: 352, y: 192}
// type: "customNode"


// {
//   "DocumentShapeId": "2E818EED-1A34-4282-5F5B-08D9BA27CFC6",
//   "ShapeId": "7dbc4e7f-f6b2-4e3a-7173-08d9b66a217c",
//   "Name": "TestName 3",
//   "PositionX": 100.5,
//   "PositionY": 13.5,
//   "Width": 50,
//   "Height": 100,
//   "Radius": null
// },


// arrowHeadColor: "#000"
// arrowHeadType: "arrowclosed"
// id: "reactflow__edge-10dedc1c-ff23-401b-b2b9-ca13a6f9780anull-fc86d118-7cce-4b35-af49-693f4db36ec4null"
// label: "new connection added"
// source: "10dedc1c-ff23-401b-b2b9-ca13a6f9780a"
// sourceHandle: null
// style: {stroke: "#000", strokeWidth: 2, color: "#000"}
// target: "fc86d118-7cce-4b35-af49-693f4db36ec4"
// targetHandle: null

// {
//   "SourceDocumentShapeId": "874548A4-3811-427B-5F5C-08D9BA27CFC6",
//   "DestinationDocumentShapeId": "E5041FE3-6794-4A66-0517-08D9BA23B8CF",
//   "Name": "Test"
// },
    