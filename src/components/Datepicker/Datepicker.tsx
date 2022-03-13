import React, {ForwardedRef} from "react";
import DatePicker from "react-datepicker";

import type { IMatchInfo } from "../../redux/reducers/competitions/competitionsDataInterfaces";
import { getUTCDate } from "../../utils/dates";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

interface IDatepicker {
    firstMatch: IMatchInfo | null,
    changeDataHandler: (startDate: Date, endDate: Date) => void
}

const maxOldMatchesDate = Date.now() - 24*60*60*1000*365*2;

const Datepicker: React.FC<IDatepicker> = ({changeDataHandler}) => {
    const [startDate, setStartDate] = React.useState<Date | null>();
    const [endDate, setEndDate] = React.useState<Date | null>(getUTCDate(Date.now()));

    React.useEffect(() => {
        setStartDate(getUTCDate(maxOldMatchesDate))
    }, [])

    const changeStartDate = (date: Date | null) => {
        setStartDate(date);
        if(endDate && date) {
            changeDataHandler(date, endDate)
        }
    }

    const changeEndDate = (date: Date | null) => {
        setEndDate(date);
        if(startDate && date) {
            changeDataHandler(startDate, date)
        }
    }

    const CustomDatePickerInput = React.forwardRef(({ value, onClick}: any, ref:ForwardedRef<HTMLButtonElement> ) => (
        <button ref={ref} onClick={onClick} className="text-zinc-50 bg-stone-700 text-lg rounded-sm placeholder:text-lg px-2 shadow-lg border mr-2">
            {value}
        </button>
    ));

    return (
        <div className="flex">
            <span className="mr-2">с</span>
            <DatePicker
                className="mb-20"
                selected={startDate}
                onChange={(date) => changeStartDate(date)}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDatePickerInput/>}
            />
            <span className="mx-2">по</span>
            <DatePicker
                selected={endDate ? endDate : startDate}
                onChange={(date) => changeEndDate(date)}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDatePickerInput/>}
            />
        </div>
    );
}

export default Datepicker;