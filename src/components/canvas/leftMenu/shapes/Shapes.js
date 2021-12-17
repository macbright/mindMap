import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Shape from './shape';

import styles from './shapes.module.scss';

const Shapes = ({shapes}) => {

    const displayImage =   shapes?.map((shape) => (
      
        <div className={styles.divImage} key={shape.id}>
            <Shape url={shape.content} id={shape.id} name={shape.name}/>
        </div>
            
    ))

    return (
    <div className={styles.main}>
        {shapes && displayImage}
    </div>
    )
}


Shapes.propTypes = {
    shapes: PropTypes.array
};
export default memo(Shapes);
