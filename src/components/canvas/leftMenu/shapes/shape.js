import React, {memo, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';




import styles from './shapes.module.scss';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)` ;
    return {
        position: 'absolute',
        transform ,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
        zIndex: 150,
    } ;
}

const Shape = ({url, id, name}) => {

   

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('src', url) 
        event.dataTransfer.setData('alt', name) 
        event.dataTransfer.setData('id', id) 
      };

    
    return (
         <div   >
            <img 
            src={`data:image/png;base64, ${url}`} 
            className={styles.image} 
            key={id}
            onDragStart={(event) => onDragStart(event, "customNode")} 
            
        />
        </div>
        
    )
}

export default memo(Shape);
