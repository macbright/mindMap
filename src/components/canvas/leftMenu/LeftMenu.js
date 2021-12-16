import React, {useState, memo, useEffect} from 'react';
import {ReactFlowProvider} from 'react-flow-renderer';
import LoaderSpinner from 'react-loader-spinner';


import { ReactComponent as SideArrow } from '../../../assets/sideArrow.svg';
import { ReactComponent as ShapesSearch } from '../../../assets/shapesSearch.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrowDown.svg';
import CanvasBoard from '../canvasBoard/CanvasBoard';
import Shapes from './shapes/Shapes';

import {useGetShapesMutation} from "../../../store/services/shapes";

import styles from './leftMenu.module.scss';

const LeftMenu = () => {

    const [getShapes, { data: response, isLoading}] = useGetShapesMutation()

    const [basicShapeToggle, setBasicShapeToggle] = useState(false);
    const [azureToggle, setAzureToggle] = useState(false);
    const [data, setData] = useState([]);
    const [continuationToken, setContinuationToken] = useState(null);

    
    useEffect(() => {
        const payload = {
            pageSize: 25,
            continuationToken: continuationToken,
        }
        getShapes(payload)
    },[])

    useEffect(() => {
        setContinuationToken(response?.continuationToken)
        if(response) setData([...data, ...response.shapes.$values])
    },[response])

    useEffect(() => {
        console.log('data: ss', data)
        recallShapes();
    },[continuationToken])

    const recallShapes = () => {
        const payload = {
            pageSize: 25,
            continuationToken: continuationToken,
        }
        if(continuationToken) getShapes(payload)
    }

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
            {azureToggle && data.length > 0 && < Shapes shapes={data} />}
            { azureToggle && <LoaderSpinner
                visible={isLoading}
                type="Oval"
                color="#00664f"
                width={25}
                height={25}
                className={styles.loading}
            />}

        </div>
        <CanvasBoard  />
    </div>
    </ReactFlowProvider>
    )
}

export default memo(LeftMenu);
