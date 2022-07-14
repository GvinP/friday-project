import {FC, useState} from "react";
import { CardType } from "../../api/cardsApi";
import s from "./LearnPage.module.css";
import {useAppDispatch} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {gradeCardTC} from "../../app/reducers/learnReducer";
import {Button} from "@mui/material";
import RadioInput from "../../common/RadioInput/RadioInput";


type LearnPagePropsType = {
  card: CardType
};

export const LearnPage: FC<LearnPagePropsType> = ({card}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];
  const [grade, setGrade] = useState(grades[2]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const roundedCardGrade = Math.round(card.grade * 100) / 100;

  const cancelHandler = () => {
    navigate(PATH.packs);
  };

  const showAnswerHandler = () => {
    setIsAnswered(true);
  };

  const nextHandler = () => {
    const data = {card_id: card._id, grade: grades.indexOf(grade) + 1};
    setIsAnswered(false);
    dispatch(gradeCardTC(data));
  };

  return (
    <div>
      {card._id === "" ?
        <div className={s.cardBlock}>
          <p>No cards found in this pack</p>
          <Button onClick={cancelHandler}>Chancel</Button>
        </div>
        :
        <div className={s.cardBlock}>
          <div className={s.cardInfoBlock}>
            <div>
              <div className={s.grade}>Card grade: {roundedCardGrade}</div>
              <div className={s.shots}>Card shots: {card.shots}</div>
            </div>
            <h4>Question:</h4>
            <p>{card.question}</p>
            {isAnswered &&
            <>
              <h4>Answer:</h4>
              <p>{card.answer}</p>
            </>
            }
          </div>
          {isAnswered &&
          <div className={s.rateBlock}>
            <h4>Rate yourself:</h4>
            <RadioInput
              name={"grade"}
              options={grades}
              value={grade}
              onChangeOption={setGrade}
            />
          </div>
          }
          <div className={s.buttonsBlock}>
            <Button onClick={cancelHandler}>Cancel</Button>
            {isAnswered ?
              <Button onClick={nextHandler}>Next</Button>
              :
              <Button onClick={showAnswerHandler}>Show answer</Button>
            }
          </div>
        </div>
      }
    </div>
  );
};
