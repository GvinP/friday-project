import React, {useEffect, useState} from 'react'
import {useDebounce} from "../../../common/Hooks/useDebounce";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {InputText} from "../../../common/InputText/InputText";
import {searchCardsPackThunk} from "../../../app/reducers/packs-reducer";


export const Search2 = () => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(state => state.packs.searchResult);


    useEffect(() => {
            dispatch(searchCardsPackThunk(debouncedValue));
    }, [dispatch])

    return (
        <div>
            <InputText type="search"
                   placeholder={'Search'}
                   value={value}
                   onChange={(e) => {
                       setValue(e.target.value)
                   }
                   }/>
            <p>Value real-time: {searchValue}</p>
            <p>Debounced value: {debouncedValue}</p>
        </div>
    )
}
