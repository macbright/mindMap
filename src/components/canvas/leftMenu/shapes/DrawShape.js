import React, {memo, useEffect, useState} from 'react';
import Moveable from "react-moveable";

import MoveableHelper from "moveable-helper";

import { imageDialogue } from '../../canvasBoard/hook';
import styles from './shapes.module.scss';




const DrawShape = ({ src, left, top, handleDelete}) => {

    console.log('left: ', left)
    const [target, setTarget] = useState();

    const [helper] = useState(() => {
        return new MoveableHelper();
    })
    const [imageProp, setImageProp] = useState(false)


    const handleClick = (e) => {
        setTarget(e.target);
        console.log(e.target.style)
        setImageProp(false);
    }

    const handleContext = (e) => {
        e.preventDefault();
        console.log('right click')
        setImageProp(!imageProp);
        
    }

    const handleDoubleClick = (e) => {
        setTarget("");
    }
    return (
        <>
            <Moveable
                target={target}
                resizable={true}
                rotatable={true}
                onResizeStart={helper.onResizeStart}
                onResize={helper.onResize}
                onRotateStart={helper.onRotateStart}
                onRotate={helper.onRotate}
                className={styles.target}
                
        />
            <img 
            src={src}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContext}
            
            // key={key}
            // className="target"
            dir="rtl"
         />
            {imageProp && imageDialogue(left, top, handleDelete)}
        </>
        
    )
}

export default memo(DrawShape);
