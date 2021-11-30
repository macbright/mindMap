import React, {useState, useEffect, memo, useCallback} from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDrop } from "react-dnd";
import {checkLeftNtop, checkImageId} from './hook';


import DrawShape from "../leftMenu/shapes/DrawShape"
import Shape from "../leftMenu/shapes/shape"

import styles from './canvasBoard.module.scss';

const CanvasBoard = ({ shapes }) => {

  const [board, setBoard] = useState({})

  

  useEffect(() => {
    console.log("shapess: ", board);
  }, [board]);

  const moveShapes = useCallback((id, imageId, left, top) => {
    console.log("shapess: ", board);

    if(!shapes){
      return null;
    }
    const selectShape = shapes?.filter((shape) => id === shape.id)
    setBoard(prevState => ({
      ...prevState, 
      [imageId]: {
        url: selectShape[0].content,
        id: selectShape[0].id,
        left: left,
        top: top,
        imageId: imageId,
      }
    }))
}, [board]);

    const [{isOver}, drop] = useDrop(() => ({
      accept: "shape",
      drop(item, monitor){
        const position = monitor.getDifferenceFromInitialOffset();
    
        let left = Math.round( checkLeftNtop(item.left) + position.x ) ;
        let top = (checkLeftNtop(item.top) + position.y );
        console.log('left ', left)
        // if(snapToGrid){
        //   ;
        //   [left, top] = doSnapToGrid(left, top)
        // }
        moveShapes(item.id, checkImageId(item.imageId), left, top)
      }

    }),[moveShapes])


    return(

       
      <div className={styles.main} >
                  <div 
                  ref={drop}
                  className={styles.canvas}
                    style={{
                        width: "70vw",
                        height: "70vh",
                        pointerEvents: "auto !important",
                        position: 'relative',
                        zIndex: 100,
                      }}
                      
                      role={'Dustbin'}
                    >
                      {
                        Object.keys(board).map((key) => {
                          return <DrawShape key={key}  {...board[key]} checkDrag={false} />
                        })
                      }
                    
                    </div>

        </div>
    )
}

export default memo(CanvasBoard);



{/* <div className={styles.main}>
            <TransformWrapper
                 initialScale={0.8}
                 maxScal={8}
                 minScale={0.1}
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
                    <div className={styles.canvas}
                    style={{
                        width: "100vw",
                        height: "90vh",
                        pointerEvents: "auto !important",
                        position: 'relative',
                        zIndex: 200,
                      }}
                      ref={drop}
                      role={'Dustbin'}
                      // onDrop={addShapeToBoard}
                    >
                      {
                        board.map((shape) => {
                          return <DrawShape url={shape.url} id={shape.id} left={shape.left} top={shape.top} isDragging={false} />
                        })
                      }
                    
                    </div>
                </TransformComponent>
                </>
           )}
            </TransformWrapper>

        </div> */}