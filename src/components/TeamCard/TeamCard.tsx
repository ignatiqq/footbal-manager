import React from 'react'
import { Link } from "react-router-dom";

interface ITeamCard {
    name: string,
    id: number,
    image: string
}

const TeamCard: React.FC<ITeamCard> = ({name, id, image}) => {

    return (
        <Link to={`/teams/${id}/matches`} className='flex flex-col items-center border max-w-[260px] max-h-[260px] min-h-[260px] w-full p-2 m-4 shadow-lg relative hover:bottom-0.5'>
            <div className='font-bold text-lg mb-4 text-center'>
                {name}
            </div>
            <div className='m-4'>
                <img className='w-[150px] max-w-[150px] max-h-[150px] h-full' src={image} alt={`${name} logo`} />
            </div>
        </Link>
    )
}

export default TeamCard;