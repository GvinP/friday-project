import {FC, useState} from "react";
import {CardType} from "../../api/cardsApi";
import s from "./LearnPage.module.css";
import {useAppDispatch} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {gradeCardTC} from "../../app/reducers/learnReducer";
import {Button, ButtonProps, styled} from "@mui/material";
import RadioInput from "../../common/RadioInput/RadioInput";
import {lightBlue} from "@mui/material/colors";


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

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(lightBlue[50]),
        backgroundColor: lightBlue[50],
        '&:hover': {
            backgroundColor: lightBlue[200],
        },
    }));

    return (
        <div>
            {card._id === ""
                ?
                <div className={s.cardBlock}>
                    <p>No cards found in this pack</p>
                    <Button onClick={cancelHandler}>Chancel</Button>
                </div>
                :
                <div className={s.cardBlock}>
                    <div className={s.cardInfoBlock}>
                        <div className={s.gradeAndShots}>
                            <div className={s.grade}>Card grade: {roundedCardGrade}</div>
                            <div className={s.shots}>Card shots: {card.shots}</div>
                        </div>
                        <div className={s.question}>
                            <h4>Question:</h4>
                            <p>{card.question}</p>
                        </div>
                        {isAnswered &&
                            <div className={s.answer}>
                                <h4>Answer:</h4>
                                <p>{card.answer}</p>
                            </div>
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
                        <ColorButton variant={"outlined"} onClick={cancelHandler}>Cancel</ColorButton>
                        {isAnswered ?
                            <ColorButton variant={"outlined"} color="success" onClick={nextHandler}>Next</ColorButton>
                            :
                            <ColorButton variant={"outlined"} color="success" onClick={showAnswerHandler}>Show answer</ColorButton>
                        }
                    </div>
                </div>
            }
        </div>
    );
};
