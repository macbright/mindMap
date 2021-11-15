import React from 'react';

import styles from './canvasBoard.module.scss';

const CanvasBoard = () => {

    return(

        <div className={styles.main}>

            <canvas className={styles.canvas}>
            
            </canvas>


        </div>
    )
}

export default CanvasBoard;