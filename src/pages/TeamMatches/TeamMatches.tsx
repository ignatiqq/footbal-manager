import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import { GET_CURRENT_TEAM_MATCHES, SET_CURRENT_TEAM_PAGE } from '../../redux/actions/teams/actionNames';
import { Datepicker, Loader, Paginator, CardMatchInfo } from "../../components";
import { formatDateToRequest } from '../../utils/dates';

import type { IMatchInfo } from '../../redux/reducers/competitions/competitionsDataInterfaces';

import sadEmoji from "../../assets/images/sadEmoji.png";

const TeamMatches: React.FC = () => {
    const [slicedData, setSlicedData] = React.useState<Array<IMatchInfo>>();

    const { id } = useParams();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if(id) {
            dispatch({type: GET_CURRENT_TEAM_MATCHES, payload: {id: id}});
        }
    }, [id])

    const { teamByIdName, currentTeamMatchesData, pagination, isLoading, error } = useAppSelector(({teamsData}) => ({
        teamByIdName: teamsData.teamById.data?.name,
        currentTeamMatchesData: teamsData.currentTeamMatches.data,
        pagination: teamsData.currentTeamMatches.pagination,
        isLoading: teamsData.currentTeamMatches.isLoading,
        error: teamsData.currentTeamMatches.error
    }))

    React.useEffect(() => {
        if(currentTeamMatchesData) {
            const sliced = currentTeamMatchesData.matches.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [currentTeamMatchesData, pagination])

    const getTeamMatchesByDate = (dateFrom: Date, dateTo: Date) => {
      dispatch({type: GET_CURRENT_TEAM_MATCHES, payload: {id: id, dateFrom: formatDateToRequest(dateFrom), dateTo: formatDateToRequest(dateTo)}});
    }

    return (
      <div>
        <div>
          <div className="flex mb-4">
            <Link to="/teams" className="mr-2">
              Команды
            </Link>
            {currentTeamMatchesData && teamByIdName ? (
              <>
                <div className="mx-4">/</div>
                <div>{teamByIdName}</div>
              </>
            ) : (
              <Loader position="left" width={30} />
            )}
          </div>
          <div className="font-bold mb-4">Матчи</div>
          <div>
            {currentTeamMatchesData && currentTeamMatchesData.matches.length ? (
              <Datepicker
                changeDataHandler={getTeamMatchesByDate}
                firstMatchDate={currentTeamMatchesData.matches[0].utcDate}
              />
            ) : (
              <div></div>
            )}
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
          ) : !isLoading && currentTeamMatchesData?.matches.length ? (
            <div className="flex flex-col items-center justify-evenly flex-wrap my-14">
              {slicedData &&
                slicedData.length > 0 &&
                slicedData.map((item: IMatchInfo) => <CardMatchInfo key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
              <div className='font-bold mb-4'>К сожалению не нашлось ни одного матча</div>
              <div className='max-w-[60px]'>
                <img src={sadEmoji} alt="404" />
              </div>
            </div>
          )}
        </div>
        {currentTeamMatchesData && currentTeamMatchesData.count && pagination ? (
          <Paginator
            paginateType={SET_CURRENT_TEAM_PAGE}
            pagination={pagination}
            position="center"
            count={currentTeamMatchesData.count}
            limit={pagination.limit}
            page={pagination.page}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default TeamMatches;