import React, {memo, useState} from 'react';
import Moveable from "react-moveable";
import PropTypes from 'prop-types';

import MoveableHelper from "moveable-helper";

import { imageDialogue } from '../../canvasBoard/hook';
import styles from './shapes.module.scss';




const DrawShape = ({ src, handleDelete, name}) => {

  
    const [target, setTarget] = useState();
    const [shapeName, setShapeName] = useState(name);


    const [helper] = useState(() => {
        return new MoveableHelper();
    })
    const [imageProp, setImageProp] = useState(false)


    const handleClick = (e) => {
        setTarget(e.target);
        console.log(e.target.style)
        setImageProp(false);
    }

    const handleImageName = (e) => {
        const val = e.target.value
        console.log( 'element id ', name)
        setShapeName(val)
    }

    const handleContext = (e) => {
        e.preventDefault();   
    }

    const handleDoubleClick = () => {
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
          <input className={styles.imageName} onChange={handleImageName} value={shapeName} />
            {imageProp && imageDialogue( handleDelete)}
        </>
        
    )
}

DrawShape.propTypes = {
    src: PropTypes.string.isRequired,
    handleDelete: PropTypes.func,
    name: PropTypes.string
};
export default memo(DrawShape);
