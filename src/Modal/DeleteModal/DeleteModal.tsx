import React from 'react';
import s from './DeleteModal.module.css'
import {Button} from "@mui/material";


type EditModalType = {
    name: string
    active: boolean
    setActive: (state: boolean) => void
    deletePack: () => void
}

export const DeleteModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        name,
        deletePack,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    }
    const deleteHandler = () => {
        deletePack();
    }

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Delete Pack</h1>
                <span
                    className={s.description}>{`Do you really want to remove ${name}? All cards will be excluded from this course.`}</span>
                <div >
                    <Button onClick={cancelHandler}>Cancel</Button>
                    <Button onClick={deleteHandler} color={'error'}>Delete</Button>
                </div>
            </div>
        </div>
    );
};
