import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createSelector } from 'reselect';
import type { RootState } from '../../redux/store';

import { CHANGE_THEME } from '../../redux/actions/actionNames';

import logo from "../../assets/images/logo.png";
import moonIcon from "../../assets/images/moonIcon.png";
import sunIcon from "../../assets/images/sunIcon.png"; 

const selectTheme = createSelector(
    (state: RootState) => state.globalSettings.theme,
    (theme) => ({theme})
  )

const Header: React.FC = () => {

    const dispatch = useAppDispatch();

    const { theme } = useAppSelector(selectTheme);

    const changeThemeHandler = () => {
        dispatch({type: CHANGE_THEME});
    }

    React.useEffect(() => {
        if(theme) {
          document.body.setAttribute('data-theme', theme);
          localStorage.setItem("theme", theme)
        }
      }, [theme])

    return (
        <header className={`py-4 px-10 mb-6 ${theme === "dark" ? "bg-stone-900" : "bg-stone-300"}`}>
            <div className='flex items-center justify-between max-w-screen-2xl mx-auto my-0 flex-wrap xs:justify-center'>
                <div className="flex items-center">
                    <Link to="/" className='mr-10 md:mr-4'>
                        <img className='max-w-[64px]' src={logo} alt="logo" />
                    </Link>
                    <nav className='mr-4'>
                        <Link className='font-bold mr-4' to="/leagues">Лиги</Link>
                        <Link className='font-bold' to="/teams">Команды</Link>
                    </nav>
                </div>
                <div>
                    <button onClick={changeThemeHandler}>
                        <img className='max-w-[36px]' src={theme === "dark" ? moonIcon : sunIcon} alt="change theme" />
                    </button>
                </div>
                           
            </div>
        </header>
    )
}

export default Header