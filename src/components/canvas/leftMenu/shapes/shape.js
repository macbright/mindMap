import React, {memo, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';



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

const Shape = ({url, id, left, top, checkDrag}) => {

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: "shape",
        item: {id, left, top},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [id, left, top])

    useEffect(() => {

    }, [drag]);


    const handleClick = () => {
        console.log('shape clicked')
    }
    return (
         <div ref={drag} onClick={handleClick}   >
            <img 
            src={`data:image/png;base64, ${url}`} 
            className={styles.image} 
            key={id}
            
        />
        </div>
        
    )
}

export default memo(Shape);
