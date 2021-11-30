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
  if(imageId === undefined){
    return uuidv4()
  }
  return imageId
}