import React from 'react';

import { usePagination } from "../../hooks";

import nextIcon from "../../assets/images/nextIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";

interface IPaginator {
    count: number,
    limit: number,
    page: number,
    pageRange?: number,
    position?: "left" | "right" | "center",
    paginateHandler: (page: number | string) => void,
    prevPageHanlder: (data: React.MouseEvent<HTMLButtonElement >) => void,
    nextPageHandler: (data: React.MouseEvent<HTMLButtonElement >) => void
}

const Paginator: React.FC<IPaginator> = ({count, limit, page, pageRange, position = "center", paginateHandler, prevPageHanlder, nextPageHandler}) => {
    const [slicedPages] = usePagination(count, limit, page, pageRange);

    return (
        <div className={`${position === "center" ? "justify-center" : position === "right" ? "justify-end" : "justify-start"} flex items-center m-4`}>
            <button onClick={prevPageHanlder} className='mr-2 max-w-[24px]'>
                <img src={prevIcon} alt="prev" />
            </button>
            {slicedPages && slicedPages.map((item, i) => (
               <button onClick={() => paginateHandler(item)} className={`"border border-[#a5a5a5] hover:bg-[#a5a5a5] transition" ${item === page && "bg-[#a5a5a5]"} px-2 mx-2`} key={item + `${i}`}>{item}</button>
            ))}
            <button onClick={nextPageHandler} className='ml-2 max-w-[24px]'>
                <img src={nextIcon} alt="next" />
            </button>
        </div>
    )
}

export default Paginator;