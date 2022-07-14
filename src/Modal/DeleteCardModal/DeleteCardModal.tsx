import React, {KeyboardEvent} from "react";
import s from "./DeleteCardModal.module.css";
import {Button} from "@mui/material";


type EditModalType = {
    name: string
    active: boolean
    setActive: (state: boolean) => void
    deleteCard: () => void
}

export const DeleteCardModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        name,
        deleteCard,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    };
    const deleteHandler = () => {
        deleteCard();
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            deleteHandler();
        }
        if (e.key === "Escape") {
            cancelHandler();
        }
    };

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock}
             onClick={() => setActive(false)}
             tabIndex={-1}
             onKeyDown={onKeyPressHandler}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Delete Card</h1>
                <span>{`Do you really want to remove card: ${name}?`}</span>
                <div>
                    <Button variant={"outlined"} onClick={cancelHandler}>Cancel</Button>
                    <Button variant={"outlined"} onClick={deleteHandler} color={"error"}>Delete</Button>
                </div>
            </div>
        </div>
    );
};
