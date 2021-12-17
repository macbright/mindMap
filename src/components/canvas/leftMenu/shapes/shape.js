import React, {memo} from 'react';
import PropTypes from 'prop-types';

import styles from './shapes.module.scss';


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

Shape.propTypes = {
    url: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
};
export default memo(Shape);
