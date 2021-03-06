import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import { GET_CURRENT_COMPETITION } from '../../redux/actions/competitions/actionNames';
import {Datepicker, Loader, Paginator, CardMatchInfo} from "../../components";
import { formatDateToRequest } from '../../utils/dates';

import type { IMatchInfo } from '../../redux/reducers/competitions/competitionsDataInterfaces';
import type { IPagination } from '../../components/Paginator/interfaces';

import sadEmoji from "../../assets/images/sadEmoji.png";

const CompetitionPage: React.FC = () => {
    const [slicedData, setSlicedData] = React.useState<Array<IMatchInfo>>();
    const [pagination, setPagination] = React.useState<IPagination>({
      page: 1,  
      limit: 7
    });

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { currentCompetitionData, isLoading, error } = useAppSelector(({competitionsData}) => ({
        currentCompetitionData: competitionsData.currentCompetition.data,
        isLoading: competitionsData.currentCompetition.isLoading,
        error: competitionsData.currentCompetition.error
    }))

    React.useEffect(() => {
        if(id) {
            dispatch({type: GET_CURRENT_COMPETITION, payload: {id: id}})
        }
    }, [id])

    React.useEffect(() => {
        if(currentCompetitionData) {
            const sliced = currentCompetitionData.matches.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [currentCompetitionData, pagination])

    const getCurrentCompetitionByDate = (dateFrom: Date, dateTo: Date) => {
      dispatch({type: GET_CURRENT_COMPETITION, payload: {id: id, dateFrom: formatDateToRequest(dateFrom), dateTo: formatDateToRequest(dateTo)}});
    }

    return (
      <div>
        <div>
          <div className="flex mb-4">
            <Link to="/leagues">Лиги</Link>
            {currentCompetitionData && (
              <>
                <div className="mx-4">/</div>
                <div>{currentCompetitionData.competition.name}</div>
              </>
            )}
          </div>
          <div className="font-bold mb-4">Матчи</div>
          <div> 
            <Datepicker
              changeDataHandler={getCurrentCompetitionByDate}
              firstMatch={currentCompetitionData && currentCompetitionData!.matches[0]}
            />
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader />
            </div>
          ) : error && error.message ? (
            <div className="flex justify-center items-center font-bold text-red-500 min-h-[60vh] text-center">
              {error.message}
            </div>
          ) : !isLoading && currentCompetitionData?.matches.length ? (
            <div className="flex flex-col items-center justify-evenly flex-wrap my-14">
              {slicedData &&
                slicedData.length > 0 &&
                slicedData.map((item: IMatchInfo) => (
                  <CardMatchInfo key={item.id} item={item} />
                ))}
            </div>
          )
          : (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
              <div className='font-bold mb-4'>К сожалению по вашему запросу ничего не найдено</div>
              <div className='max-w-[60px]'>
                <img src={sadEmoji} alt="404" />
              </div>
            </div>
          )
        }
        </div>
        {currentCompetitionData && currentCompetitionData.count && pagination ? (
          <Paginator
            setPagination={setPagination}
            pagination={pagination}
            position="center"
            count={currentCompetitionData.count}
            limit={pagination.limit}
            page={pagination.page}
          />
        )
        :
        <div></div>
      }
      </div>
    );
}

export default CompetitionPage;