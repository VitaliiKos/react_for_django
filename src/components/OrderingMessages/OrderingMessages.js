import React, {useEffect} from 'react';
import {orderActions} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {Order} from "../Order/Order";

const OrderingMessages = () => {
    const dispatch = useDispatch();
    const {order_messages} = useSelector(state => state.orderMessages);
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(() => {
        dispatch(orderActions.getAll({page: query.get('page')}))
    }, [dispatch, query]);

    return (
        <div>
            {
                order_messages &&
                order_messages.map(message => <Order key={message.id} message={message}/>)
            }
        </div>
    );
};

export {OrderingMessages};