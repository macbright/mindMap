import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import ExportCanvas from './exportCanvas/ExportCanvas';
import { ReactComponent as Export } from '../../../assets/export.svg';
import { ReactComponent as CanvasLogo } from '../../../assets/canvasLogo.svg';
import { ReactComponent as Saving } from  '../../../assets/saving.svg';
import {saveDocumentData } from '../../../store/slice/canvasElement';



import styles from './menu.module.scss';


const Menu = ({state}) => {

    const [toggle, setToggle] = useState(false)
    const selector = useSelector((state) => state.canvasElements.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('selector: ', selector)
        dispatch(saveDocumentData(state))
    }, [state])

    const handleExport = () =>{
        setToggle(!toggle);
    }

    const cancelExport = () => {
        setToggle(!toggle);
    }


    return (
        <div className={styles.nav}>
            <div className={styles.logo}> <CanvasLogo />  </div>
            <div className={styles.menuDiv}> 
                <div>
                    <h3>{state.name }</h3>
                    <ul className={styles.menuItems}>
                        <li>File</li>
                        <li>Edit</li>
                        <li>Select</li>
                        <li>View</li>
                        <li>Insert</li>
                        <li>Arrange</li>
                        <li className={styles.saveIcon}> <Saving className={styles.saving} /> <span>
                            {selector.isSaving === 1 && 'Saving...'} {selector.saved === 1 && 'Saved'} </span></li>
                    </ul>
                </div>
                <div className={styles.navRight}>
                    <p onClick={handleExport}> Export</p>
                    <Export onClick={handleExport} />
                    { toggle && <ExportCanvas setToggle={cancelExport} /> }
                </div>
            </div>
        </div>
    )
}
Menu.propTypes = {
    state: PropTypes.object
};

export default Menu;
