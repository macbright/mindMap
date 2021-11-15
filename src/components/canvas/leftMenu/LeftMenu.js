import React, {useState} from 'react';


import { ReactComponent as SideArrow } from '../../../assets/sideArrow.svg';
import { ReactComponent as ShapesSearch } from '../../../assets/shapesSearch.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrowDown.svg';
import CanvasBoard from '../canvasBoard/CanvasBoard';
import styles from './leftMenu.module.scss';

const LeftMenu = () => {

    const [basicShapeToggle, setBasicShapeToggle] = useState(false);
    const [azureToggle, setAzureToggle] = useState(false);

    return (
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
            
            <div className={styles.basicShapes}>
                <p> Basic shapes</p>
                {!basicShapeToggle && < SideArrow onClick={() => setBasicShapeToggle(!basicShapeToggle)}/>}
                {basicShapeToggle && < ArrowDown  onClick={() => setBasicShapeToggle(!basicShapeToggle)}/>}
            </div>
            <div className={styles.azure}>
                <p> Azure 2019</p>
                {!azureToggle && < SideArrow onClick={() => setAzureToggle(!azureToggle)}/>}
                {azureToggle && < ArrowDown onClick={() => setAzureToggle(!azureToggle)} />}
            </div>
        </div>
        <CanvasBoard />
    </div>
    )
}

export default LeftMenu;
