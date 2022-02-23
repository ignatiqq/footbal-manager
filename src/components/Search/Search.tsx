import React, { ChangeEvent } from 'react';

import searchIcon from "../../assets/images/searchIcon.svg";

interface ISearchProps {
    placeholder?: string,
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    theme: "light" | "dark"
}

const Search: React.FC<ISearchProps> = ({changeHandler, placeholder, value, theme}) => {
  return (
    <input
      className={`${
        theme === 'light' ? 'text-stone-900 bg-zinc-50' : 'text-zinc-50 bg-stone-900'
      } text-lg rounded-sm placeholder:text-lg px-2 shadow-lg border-slate-200 border`}
      value={value}
      onChange={changeHandler}
      placeholder={placeholder ? placeholder : 'Поиск'} />
  );
}

export default Search;