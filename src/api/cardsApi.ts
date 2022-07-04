import {instance} from "./api";

export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;

    answer: string;
    question: string;
    grade: number;
    shots: number;

    questionImg: string;
    answerImg: string;
    answerVideo: string;
    questionVideo: string;

    comments: string;

    type: string;
    rating: number;
    more_id: string;

    created: string;
    updated: string;
}

export type GetDataType = {
    cards: CardType[];

    error: string;
}

export const cardsApi = {
    getCards(cardsPack_id: string) {
        return instance.get<GetDataType>(`/cards/card?cardsPack_id=${cardsPack_id}`)
            .then(res => {
                return res.data
            })
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        instance.post('cards/card', {
            card: {
                cardsPack_id,
                question,
                answer
            }
        })
    },
};