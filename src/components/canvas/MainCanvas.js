import React from 'react';
import { useLocation} from "react-router-dom";


import Menu from './menu/Menu';
import LeftMenu from './leftMenu/LeftMenu';


const MainCanvas = () => {
    const location = useLocation();

    console.log("params: ", location);
    return (
        <div>
            <Menu state={location.state}/>
            <LeftMenu />

        </div>
    )
}

export default MainCanvas;