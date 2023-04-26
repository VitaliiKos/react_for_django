import React from 'react';
import {Outlet} from "react-router-dom";

const AuthRequireLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export {AuthRequireLayout};