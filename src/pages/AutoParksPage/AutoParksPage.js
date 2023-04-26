import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import {autoParkActions} from "../../redux";

import css from "./autoParksPage.module.css";
import {AutoPark} from "../../components";

const AutoParksPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {autoParks} = useSelector(state => state.autoParks);

    useEffect(() => {
        dispatch(autoParkActions.getAll())
    }, [dispatch]);

    return (
        <div className={css.autoParksWrapper}>
            <div className={css.autoParksListBlock}>
                <div className={css.autoParkCard}
                     onClick={() => {navigate(`/auto_parks`)}}
                >
                    <h3>All Auto Parks</h3>
                </div>

                {
                    autoParks &&
                    autoParks.map(autoPark => <AutoPark key={autoPark.id} autoPark={autoPark}/>)
                }</div>

            <Outlet/>
            <div>
                {/*<button disabled={!prevPage}*/}
                {/*        onClick={() => setQuery(query => ({page: +query.get('page') - 1}))}>PrevPage*/}
                {/*</button>*/}
                {/*<button disabled={!nextPage}*/}
                {/*        onClick={() => setQuery(query => ({page: +query.get('page') + 1}))}>NextPage*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export {AutoParksPage};