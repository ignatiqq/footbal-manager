import React from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { usePagination } from "../../hooks";
import nextIcon from "../../assets/images/nextIcon.svg";
import prevIcon from "../../assets/images/prevIcon.svg";

import type { IPagination } from "../../redux/interfaces/globalInterfaces";

interface IPaginator {
    count: number,
    limit: number,
    page: number,
    pageRange?: number,
    position?: "left" | "right" | "center",
    paginateType: string,
    pagination: IPagination
}

const Paginator: React.FC<IPaginator> = ({count, limit, page, pageRange, position = "center", paginateType, pagination }) => {
    const [slicedPages] = usePagination(count, limit, page, pageRange);

    const dispatch = useAppDispatch();
  
    const paginateHandler = (page: number | string) => {
      if(typeof page === "number") {
          dispatch({type: paginateType, payload: page})
      }
    }

    const prevPageHanlder = () => {
      if(pagination.page > 1) {
        dispatch({type: paginateType, payload: pagination.page - 1})
      }
    }

    const nextPageHandler = () => {
      if(pagination.page < Math.ceil(count / pagination.limit))
      dispatch({type: paginateType, payload: pagination.page + 1})
    }

    React.useEffect(() => {
      if(page) {
        window.scrollTo(0,0);
      }
    }, [page])

    return (
      <div className={`${
        position === 'center'
          ? 'justify-center'
          : position === 'right'
          ? 'justify-end'
          : 'justify-start'
      } flex`}>
        <button onClick={prevPageHanlder} className="mr-2 md:ml-1 max-w-[24px]">
          <img src={prevIcon} alt="prev" />
        </button>
        <div
          className={`flex items-center m-4 md:my-4`}>
          {slicedPages &&
            slicedPages.map((item, i) => (
              <button
                onClick={() => paginateHandler(item)}
                className={`"border border-[#a5a5a5] hover:bg-[#a5a5a5] transition" ${
                  item === page && 'bg-[#a5a5a5]'
                } px-2 mx-2 md:mx-0`}
                key={item + `${i}`}>
                {item}
              </button>
            ))}
        </div>
        <button onClick={nextPageHandler} className="ml-2 md:ml-1 max-w-[24px]">
          <img src={nextIcon} alt="next" />
        </button>
      </div>
    );
}

export default Paginator;