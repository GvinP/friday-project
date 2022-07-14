import {LearnPage} from "./LearnPage";
import {Navigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {CardType} from "../../api/cardsApi";
import {getRandomCard} from "../../common/utils/getRandomCard";
import {getCardsTC, setPageCountAC} from "../../app/reducers/cards-reducer";
import {PATH} from "../../Navigation/Routes/RoutesList";
import {Preloader} from "../../common/Preloader/Preloader";
import style from "./LearnPageContainer.module.css"


export const LearnPageContainer = () => {
  const urlParams = useParams<"cardPackID">();
  const cardPack_ID = urlParams.cardPackID;

  const user_ID = useAppSelector(state => state.profile.user._id);
  const cardPackName = useAppSelector(state => state.learn.cardsPackName);
  const cards = useAppSelector(state => state.cards.cards);
  const isFetchingCards = useAppSelector<boolean>(state => state.cards.isFetchingCards);
  const dispatch = useAppDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [randomCard, setRandomCard] = useState<CardType>({
    _id: "",
    cardsPack_id: "",
    user_id: "",
    question: "",
    answer: "",
    grade: 0,
    shots: 0,
    created: "",
    updated: "",
  });

  useEffect(() => {
    if (cardPack_ID && isFirstLoad) {
      dispatch(getCardsTC({cardsPack_id: cardPack_ID, pageCount: 1000000}));
      setIsFirstLoad(false);
    }

    if (cards.length > 0) setRandomCard(getRandomCard(cards));

    return () => {
      dispatch(setPageCountAC(5));
    };
  }, [dispatch, cardPack_ID, cards, isFirstLoad]);

  if (!user_ID) {
    return <Navigate to={PATH.login}/>
  }

  return (
    <div className={style.mainBlock}>
      <div className={style.container}>
        <h1>{`Learn pack: ${cardPackName}`}</h1>
        {isFetchingCards ?
            <div>
              <Preloader/>
              <p>Just a moment, please :)</p>
              <p>Getting random card for You...</p>
            </div>
            :
            <LearnPage card={randomCard}/>
        }
      </div>
    </div>
  );
};
