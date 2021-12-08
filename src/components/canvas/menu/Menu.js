import React, {useState} from 'react';

import ExportCanvas from './exportCanvas/ExportCanvas';
import { ReactComponent as Export } from '../../../assets/export.svg';
import { ReactComponent as CanvasLogo } from '../../../assets/canvasLogo.svg';



import styles from './menu.module.scss';


const Menu = ({state}) => {

    const [toggle, setToggle] = useState(false)

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

export default Menu;
