import {instance} from "./api";

export type CardType = {
    _id: string;
    cardsPack_id?: string;
    user_id?: string;
    answer: string;
    question: string;
    grade: number;
    shots?: number;
    questionImg?: string;
    answerImg?: string;
    answerVideo?: string;
    questionVideo?: string;
    comments?: string;
    type?: string;
    rating?: number;
    more_id?: string;
    created?: string;
    updated: string;
}

export type GetDataType = {
    cards: CardType[];
    cardsTotalCount: number;
    error: string;
}

export const cardsApi = {
    getCards(cardsPack_id: string, pageCount: number, page:number, order: number, orderBy: string) {
        return instance.get<GetDataType>(`/cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}&sortCards=${order}${orderBy}`)
            .then(res => {
                return res.data
            })
    },

    getCards2(params: GetCardsQueryParams) {
        return instance.get<GetCardsResponseDataType>("cards/card", {params})
            .then(response => response.data);
    },

    createCard(newCard: NewCardDataType) {
        return instance.post("cards/card", {card: newCard})
            .then(response => response.data);
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

export type GetCardsQueryParams = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
};

export type NewCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
};
export type GetCardsResponseDataType = {
    cards: Array<CardType>
    packUserId: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
};