import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "./AddPackModal.module.css";
import {Button} from "@mui/material";
import {InputText} from "../../common/InputText/InputText";


type EditModalType = {
    name: string
    inputValue: string
    setInputValue: (value: string) => void
    active: boolean
    setActive: (state: boolean) => void
    inputFocus: () => void
    addPack: () => void
    makePrivate: (isPrivate: boolean) => void
}

export const AddPackModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        inputValue,
        setInputValue,
        inputFocus,
        name,
        addPack,
        makePrivate,

    }
) => {

    const cancelHandler = () => {
        setActive(false);
    };
    const saveHandler = () => {
        addPack();
    };
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        makePrivate(e.currentTarget.checked);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            saveHandler();
        }
        if (e.key === "Escape") {
            cancelHandler();
        }
    };

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Add new pack</h1>
                <div className={s.inputBlock}>
                    <InputText
                        value={inputValue}
                        onChangeText={setInputValue}
                        onKeyDown={onKeyPressHandler}
                        onFocus={inputFocus}
                        placeholder={name}
                    />
                </div>
                <div className={s.private}>
                    <span>Make it private?</span>
                    <input onChange={inputHandler} type="checkbox"/>
                </div>
                <div>
                    <Button variant={"outlined"} onClick={cancelHandler}>Cancel</Button>
                    <Button variant={"outlined"} onClick={saveHandler}>Add</Button>
                </div>
            </div>
        </div>
    );
};