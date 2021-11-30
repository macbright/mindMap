import React, {memo, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';



function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)` ;
    return {
        position: 'fixed',
        transform ,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
        zIndex: 150,
    } ;
}

const DrawShape = ({url, id, imageId, left, top, isDragging}) => {

    const [{}, drag, preview] = useDrag(() => ({
        type: "shape",
        item: {id, imageId, left, top},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [ id, left, top])



    useEffect(() => {
        console.log('left: ', left)
        console.log('styles: ', getStyles(left, top, isDragging))
    }, []);

    const handleClick = () => {
        console.log('shape clicked')
    }
    return (

            <img 
            src={`data:image/png;base64, ${url}`} 
            style={getStyles(left, top, isDragging)} onClick={handleClick}
            ref={drag} 
            role="Shape"
         />
    
        
    )
}

export default memo(DrawShape);
