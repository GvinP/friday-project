import React, {ChangeEvent} from "react";
import s from "./ChangeNamePackModal.module.css";
import {Button} from "@mui/material";
import {InputText} from "../../common/InputText/InputText";


type EditModalType = {
    name: string
    inputValue: string
    setInputValue: (value: string) => void
    active: boolean
    setActive: (state: boolean) => void
    inputFocus: () => void
    savePack: () => void
}

export const ChangeNamePackModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        inputValue,
        setInputValue,
        inputFocus,
        name,
        savePack,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    };
    const saveHandler = () => {
        savePack();
    };

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Edit pack</h1>
                <div className={s.inputBlock}>
                    <InputText
                        value={inputValue}
                        onChangeText={setInputValue}
                        onFocus={inputFocus}
                        placeholder={name}
                    />
                </div>
                <div>
                    <Button variant={"outlined"} onClick={cancelHandler}>Cancel</Button>
                    <Button variant={"outlined"} onClick={saveHandler}>Save</Button>
                </div>
            </div>

        </div>
    );
};
