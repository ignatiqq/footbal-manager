import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import type { ICompetitionOne } from '../../redux/sagas/getData';

import { Search, Loader, CompetitionCard } from '../../components';

const Main: React.FC = () => {
    const [search, setSearch] = React.useState<string>("");
    const [slicedData, setSlicedData] = React.useState<Array<ICompetitionOne> | null>(null);

    const dispatch = useAppDispatch();

    const { competitions, isLoading, error, count, pagination } = useAppSelector(({footbalData}) => ({
        competitions: footbalData.competitions.data,
        isLoading: footbalData.competitions.isLoading,
        error: footbalData.competitions.error,
        count: footbalData.competitions.data?.count,
        pagination: footbalData.competitions.pagination
    }))

    React.useEffect(() => {
        dispatch({type: "GET_COMPETITIONS_DATA"})
    }, []);

    React.useEffect(() => {
        if(competitions) {
            const sliced = competitions.competitions.slice(pagination.page - 1, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [competitions, pagination])


    return (
        <div>
            <div className='my-6'>
                <Search theme="light" value={search} placeholder="Поиск матчей" changeHandler={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
            </div>
            {
                !competitions && isLoading ?
                <div className='flex justify-center items-center min-h-[60vh]'>
                    <Loader />
                </div>
                : error && error.message ?
                <div className='flex justify-center items-center font-bold text-red-500 min-h-[60vh]'>{error.message}</div>
                :
                <div className='flex items-center justify-center flex-wrap'>
                    {
                        slicedData && slicedData.length > 0 && 
                        slicedData.map((item: ICompetitionOne) => (
                            <CompetitionCard key={item.id} name={item.name} area={item.area}  />
                        ))
                    }
                </div>
            }
        </div>

    )
}

export default Main;