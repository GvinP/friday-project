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
    cardsTotalCount: number;
    error: string;
}

export const cardsApi = {
    getCards(cardsPack_id: string, pageCount?: number, page?:number) {
        return instance.get<GetDataType>(`/cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}`)
            .then(res => {
                return res.data
            })
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post('cards/card', {
            card: {cardsPack_id, question, answer}
        })
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },

    updateCard(cardId: string, newQuestion: string, newAnswer: string) {
        return instance.put('cards/card', {
            card: {_id: cardId, question: newQuestion, answer: newAnswer}
        })
    },
};