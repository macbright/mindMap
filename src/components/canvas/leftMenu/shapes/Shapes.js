import React, {memo} from 'react';

import Shape from './shape';

import styles from './shapes.module.scss';

const Shapes = ({shapes}) => {

    const displayImage =   shapes?.map((shape, i) => (
      
        <div className={styles.divImage} key={shape.id}>
            <Shape url={shape.content} id={shape.id}/>
        </div>
            
    ))

    return (
    <div className={styles.main}>
        {shapes && displayImage}
    </div>
    )
}

export default memo(Shapes);
