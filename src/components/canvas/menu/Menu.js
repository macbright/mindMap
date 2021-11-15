import React from 'react';

import { ReactComponent as Export } from '../../../assets/export.svg';
import { ReactComponent as CanvasLogo } from '../../../assets/canvasLogo.svg';

import styles from './menu.module.scss';


const Menu = () => {

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
                <p> Export</p>
                <Export />
            </div>

        </div>
    )
}

export default Menu;
