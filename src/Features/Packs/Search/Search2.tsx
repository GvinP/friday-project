import React, {useEffect, useState} from 'react'
import {useDebounce} from "../../../common/Hooks/useDebounce";
import {useAppDispatch} from "../../../app/store";
import {InputText} from "../../../common/InputText/InputText";
import {searchCardsPackThunk, setSearchResultAC} from "../../../app/reducers/packs-reducer";


export const Search2 = () => {
    const [value, setValue] = useState<string>('')
    const debounce = useDebounce<string>(value, 1000)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchCardsPackThunk(debounce));
    }, [debounce])

    return (
        <div>
            <InputText type="search"
                       placeholder={'Search'}
                       value={value}
                       onChange={(e) => {
                           setValue(e.target.value)
                           dispatch(setSearchResultAC(debounce))
                       }
                       }/>
        </div>
    )
}
