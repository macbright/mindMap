import React, {useState, memo, useMemo} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {ReactFlowProvider} from 'react-flow-renderer';


import { ReactComponent as SideArrow } from '../../../assets/sideArrow.svg';
import { ReactComponent as ShapesSearch } from '../../../assets/shapesSearch.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrowDown.svg';
import CanvasBoard from '../canvasBoard/CanvasBoard';
import Shapes from './shapes/Shapes';

import {useGetShapesQuery} from "../../../store/services/shapes";

import styles from './leftMenu.module.scss';

const LeftMenu = () => {

    const { data = {}, isFetching: isLoadingList } = useGetShapesQuery()

    const [basicShapeToggle, setBasicShapeToggle] = useState(false);
    const [azureToggle, setAzureToggle] = useState(false);

    // useEffect(() => {
    //     const page = {
    //         pageSize: 2
    //     }
    //     console.log('data: ', data)
    // },[data])

    return (
    <ReactFlowProvider>
    <div className={styles.main}>
        <div className={styles.leftMenu}>
            <div>
            <div className={styles.searchDiv}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search shapes"
                /> 
                < ShapesSearch />
            </div>
            </div>
            
            <div className={styles.toggleDiv}>
                <p> Basic shapes</p>
                {!basicShapeToggle && < SideArrow onClick={() => setBasicShapeToggle(!basicShapeToggle)}/>}
                {basicShapeToggle && < ArrowDown  onClick={() => setBasicShapeToggle(!basicShapeToggle)}/>}
            </div>
            <div className={styles.toggleDiv}>
                <p> Azure 2019</p>
                {!azureToggle && < SideArrow onClick={() => setAzureToggle(!azureToggle)}/>}
                {azureToggle && < ArrowDown onClick={() => setAzureToggle(!azureToggle)} />}
            </div>
            {azureToggle && < Shapes shapes={data.shapes.$values} />}
        </div>
        {data.shapes && <CanvasBoard shapes={data.shapes.$values} />}
    </div>
    </ReactFlowProvider>
    )
}

export default memo(LeftMenu);
