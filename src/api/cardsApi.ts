import {instance} from "./api";

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
  rating: number
  created: string
  updated: string
  more_id: string
}

export type cardPacksDataType = {
  cardPacks: PacksType[]
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

  getCardsPack(requestData: requestDataType) {
    return instance.get<cardPacksDataType>(`/cards/pack`,
        {params: {...requestData}})
        .then(res => {
          return res.data
        })
  },
};