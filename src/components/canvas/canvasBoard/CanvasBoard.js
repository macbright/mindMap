import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import styles from './canvasBoard.module.scss';

const CanvasBoard = () => {

    return(

        <div className={styles.main}>
            

            <TransformWrapper
                 initialScale={0.8}
                 maxScal={8}
                 minScale={0.1}
                //  options={{ disabled: false, minScale: 0.2 }}
                 limitToBounds={false}
                 wheel={{ disabled: false }}
                 zoomIn={{ step: 2 }}
                 zoomOut={{ step: 2 }}
                 centerOnInit={true}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
             <>
               <div
                 style={{
                   position: "absolute",
                   bottom: "10px",
                   right: "10px",
                   zIndex: 100,
                   backgroundColor: '#fff',
                   padding: '15px'
                 }}
               >
                 <button onClick={() => zoomIn(0.1)}>+</button>
                 <button style={{ marginLeft: "10px" }} onClick={() => zoomOut(0.1)}>
                   -
                 </button>
                 <button style={{ marginLeft: "10px" }} onClick={() => resetTransform()}>
                   x
                 </button>
               </div>
                <TransformComponent>
                    <canvas className={styles.canvas}
                    style={{
                        width: "100vw",
                        height: "90vh",
                        pointerEvents: "auto !important"
                      }}
                    >
                    
                    </canvas>
                </TransformComponent>
                </>
           )}
            </TransformWrapper>

        </div>
    )
}

export default CanvasBoard;


{/* <TransformWrapper
         
         >
           {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
             <>
               <div
                 style={{
                   position: "absolute",
                   bottom: "10px",
                   right: "10px",
                   zIndex: 100
                 }}
               >
                 <button onClick={zoomIn}>+</button>
                 <button style={{ marginLeft: "10px" }} onClick={zoomOut}>
                   -
                 </button>
                 <button style={{ marginLeft: "10px" }} onClick={resetTransform}>
                   x
                 </button>
               </div>
               <TransformComponent>
                 <div
                   className="container"
                   
                 ></div>
               </TransformComponent>
             </>
           )}
         </TransformWrapper>
       ); */}