import React from 'react';
import { useParams } from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import { GET_CURRENT_COMPETITION } from '../../redux/sagas/actions';
import {Datepicker, Loader} from "../../components";

import type { ICurrentCompetitionMatch } from "../../redux/sagas/fetchData/interfaces";

const CompetitionPage: React.FC = () => {

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { currentCompetitionData, isLoading, error } = useAppSelector(({footbalData}) => ({
        currentCompetitionData: footbalData.currentCompetition.data,
        isLoading: footbalData.currentCompetition.isLoading,
        error: footbalData.currentCompetition.error
    }))

    React.useEffect(() => {
        if(id) {
            dispatch({type: GET_CURRENT_COMPETITION, payload: id})
        }
    }, [id])

    console.log(error, "err")

    return (
        <div>
            <div>
                <div className="font-bold mb-4">
                    Матчи
                </div>
                <div>
                    <Datepicker firstMatchDate={currentCompetitionData && currentCompetitionData.matches[0].utcDate} />
                </div>
            </div>
            <div>
                {!currentCompetitionData && isLoading ? (
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <Loader />
                    </div>
                )
                    : error && error.message ? (
                        <div className="flex justify-center items-center font-bold text-red-500 min-h-[60vh] text-center">
                            {error.message}
                        </div>
                    ) : (
                        <div className="flex items-center justify-evenly flex-wrap my-14">
                            {currentCompetitionData &&
                                currentCompetitionData.matches.length > 0 &&
                                currentCompetitionData.matches.map((item: ICurrentCompetitionMatch) => (
                                    <div key={item.id}>{item.id}</div>
                                ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CompetitionPage;