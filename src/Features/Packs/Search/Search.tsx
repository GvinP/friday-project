import React, {useRef} from 'react';
import s from './Search.module.css'
import {AppThunk, useAppDispatch, useAppSelector} from "../../../app/store";
import {InputText} from "../../../common/InputText/InputText";
import {searchCardsPackThunk, setSearchResultAC} from "../../../app/reducers/packs-reducer";


export const Search = () => {

  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(state => state.packs.searchResult);

  const Debounced = (func: Function, delay: number) => {
    const ref = useRef(0);
    return (args: AppThunk) => {
      clearTimeout(ref.current);
      ref.current = Number(setTimeout(() => func(args), delay));
    };
  };
  const debounce = Debounced(dispatch, 1000);

  const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(searchCardsPackThunk(e.currentTarget.value));
    dispatch(setSearchResultAC(e.currentTarget.value));
  }

  return (
    <div className={s.mainContent}>
      <InputText placeholder={"Search..."}
                 type={'search'}
                 value={searchValue}
                 onChange={handleInputEvent}
      />
    </div>
  )
}
