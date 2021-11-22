import React, {useState} from 'react';

import ExportCanvas from './exportCanvas/ExportCanvas';
import { ReactComponent as Export } from '../../../assets/export.svg';
import { ReactComponent as CanvasLogo } from '../../../assets/canvasLogo.svg';



import styles from './menu.module.scss';


const Menu = () => {

    const [toggle, setToggle] = useState(false)

    const handleExport = () =>{
        setToggle(!toggle);
    }

    const cancelExport = () => {
        setToggle(!toggle);
    }


    return (
        <div className={styles.nav}>
            <ul className={styles.menuItems}>
                <li className={styles.logo}> <CanvasLogo />  </li>
                <li>File</li>
                <li>Edit</li>
                <li>Select</li>
                <li>View</li>
                <li>Insert</li>
                <li>Arrange</li>
            </ul>
            <div className={styles.navRight}>
                <p onClick={handleExport}> Export</p>
                <Export onClick={handleExport} />
                { toggle && <ExportCanvas setToggle={cancelExport} /> }
            </div>

        </div>
    )
}

export default Menu;
