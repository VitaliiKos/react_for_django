import React from 'react';

import css from './homePage.module.css'

const HomePage = () => {
    return (
        <div className={css.wrapperHomepage}>
            <div className={css.description}>
                <h1>Rent a car</h1>
            </div>
        </div>
    );
};

export {HomePage};