import React, {useEffect, useState} from 'react';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {DateRangePicker, LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import {LicenseInfo} from '@mui/x-license-pro';
import dayjs from "dayjs";
import {useDispatch} from "react-redux";

import css from './orderingCar.module.css';
import {userActions} from "../../redux";

const OrderingCar = ({car_id}) => {

    const today = dayjs();
    const tomorrow = dayjs().add(3, 'day');

    const dispatch = useDispatch();

    const [dateValue, setDateValue] = useState([today, tomorrow]);

    LicenseInfo.setLicenseKey(
        'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
    );

    const send_order = () => {
        dispatch(userActions.orderCar({
            car_id: car_id,
            data:
                {
                    'rent_start': dateValue[0].add(1, 'day')['$d'].toJSON(),
                    'rent_end': dateValue[1].add(1, 'day')['$d'].toJSON()
                }
        }))

        setDateValue([today, tomorrow]);
    }

    useEffect(() => {
    }, [dateValue, car_id])

    return (
        <div className={css.orderingBlock}>
            <div className={css.orderTimeTitle}>
                <h3>Chose time for order car</h3>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangePicker']}>
                        {/*<DemoItem label="Chose time for order car " component="DateRangePicker">*/}
                        <DemoItem component="DateRangePicker">
                            <DateRangePicker
                                value={dateValue}
                                minDate={today}
                                onChange={(newValue) => {
                                    setDateValue(newValue)
                                }}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <div className={css.orderingButton}>
                <button onClick={() => {
                    send_order()
                }}>Order
                </button>
            </div>
        </div>
    );
}

export {OrderingCar};

