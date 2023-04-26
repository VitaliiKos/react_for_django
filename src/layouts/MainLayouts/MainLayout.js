import React from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../../components";
import css from './mainLayout.module.css';

const MainLayouts = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.menu}>
                <Header/>
            </div>

            <div className={css.content}>
                <Outlet/>
            </div>

        </div>);
};

export {MainLayouts};