import {instance} from "./api";


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

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  question: string
  answer: string
  grade: number
  shots: number
  comments?: string
  type?: string
  rating?: number
  more_id?: string
  created: string
  updated: string
  __v?: number
  answerImg?: string
  answerVideo?: string
  questionImg?: string
  questionVideo?: string
}

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

export type UpdateCardModelType = {_id: string} & Partial<Omit<CardType, "_id">>;

export type GetCardsResponseDataType = {
  cards: Array<CardType>
  packUserId: string
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
};
export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number // useless o_O
  created: string // Лёха, тут нужна строка!!!
  updated: string // Лёха, тут нужна строка!!!
  more_id: string
}
export type AddPackType = {
  name: string // если не отправить будет таким
  deckCover: string // не обязателен
  private: boolean
}
export type UpdatePackType = {
  _id: string // если не отправить будет таким
  deckCover: string // не обязателен
  private: boolean
}
export type cardPacksDataType = {
  cardPacks: PacksType[]

  // we need it types ?!
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: Date
}

export type requestDataType = {
  pageCount?: number
  page?: number
  packName?: string
  user_id?: string
  sortPacks?: string
  min?: number
  max?: number
}

export const cardsAPI = {
  getCards(params: GetCardsQueryParams) {
    return instance.get<GetCardsResponseDataType>("cards/card", {params})
      .then(response => response.data);
  },
  createCard(newCard: NewCardDataType) {
    return instance.post("cards/card", {card: newCard})
      .then(response => response.data);
  },
  deleteCard(id: string) {
    return instance.delete("cards/card", {params: {id}})
      .then(response => response.data);
  },
  updateCard(cardModel: UpdateCardModelType) {
    return instance.put("cards/card", {card: cardModel})
      .then(response => response.data);
  },
  getCardsPack(requestData: requestDataType) {
    return instance.get<cardPacksDataType>(`/cards/pack`,
        {params: {...requestData}})
        .then(res => {
          return res.data
        })
  },
  addNewPack(name: string, makePrivate: boolean) {
    return instance.post<AddPackType>(`/cards/pack`,
        {cardsPack: {name, private: makePrivate}})
  },
  deleteCardsPack(id: string) {
    return instance.delete<cardPacksDataType>(`/cards/pack/?id=${id}`)
  },
  updateCardsPack(_id: string, name: string, makePrivate: boolean) {
    return instance.put<UpdatePackType>(`/cards/pack`, {cardsPack: {_id, name, private: makePrivate}})
  },
};