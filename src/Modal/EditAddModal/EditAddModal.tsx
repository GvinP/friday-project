import React from 'react';
import s from './EditAddModal.module.css';
import {Button} from "@mui/material";
import {Textarea} from "../../common/Textarea/Textarea";


type EditModalType = {
  inputAnswer: string
  setInputAnswer: (value: string) => void
  inputQuestion: string
  setInputQuestion: (value: string) => void
  active: boolean
  setActive: (state: boolean) => void
  setCard: () => void
}

export const EditAddModal: React.FC<EditModalType> = (
  {
    active,
    setActive,
    inputAnswer,
    setInputAnswer,
    inputQuestion,
    setInputQuestion,
    setCard,
  }
) => {

  const cancelHandler = () => {
    setActive(false);
  }
  const saveHandler = () => {
    setCard();
    setActive(false)
  }

  return (
    <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock}
         onClick={() => setActive(false)}>

      <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
           onClick={e => e.stopPropagation()}>
        <h1>Card info</h1>
        <div className={s.inputBlock}>
          <label>
            <span>Question:</span>
            <Textarea
              value={inputQuestion}
              onChangeValue={setInputQuestion}
            />
          </label>
          <label>
            <span>Answer:</span>
            <Textarea
              value={inputAnswer}
              onChangeValue={setInputAnswer}
            />
          </label>
        </div>
        <div>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </div>
    </div>
  );
};
