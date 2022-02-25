import React, {ForwardedRef} from "react";
import DatePicker from "react-datepicker";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

interface IDatepicker {
    firstMatchDate: string | null
}

const Datepicker: React.FC<IDatepicker> = ({firstMatchDate}) => {
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(new Date(Date.now() - ((new Date().getTimezoneOffset()) * 60)));

    const CustomDatePickerInput = React.forwardRef(({ value, onClick}: any, ref:ForwardedRef<HTMLButtonElement> ) => (
        <button ref={ref} onClick={onClick} className="text-zinc-50 bg-stone-700 text-lg rounded-sm placeholder:text-lg px-2 shadow-lg border mr-2">
            {value}
        </button>
    ));

    React.useEffect(() => {
        if(firstMatchDate) {
            setStartDate(new Date(firstMatchDate));
        }
    }, [firstMatchDate])

    return (
        <div className="flex">
            <span className="mr-2">с</span>
            <DatePicker
                className="mb-20"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDatePickerInput/>}
            />
            <span className="mx-2">по</span>
            <DatePicker
                selected={endDate ? endDate : startDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDatePickerInput/>}
            />
        </div>
    );
}

export default Datepicker;