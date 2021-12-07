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
