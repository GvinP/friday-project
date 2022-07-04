import {instance} from "./api";

export type PackType = {
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

export type reqDataType = {
  pageCount?: number
  page?: number
  packName?: string
  user_id?: string
  sortPacks?: string
  min?: number
  max?: number
}

export const packsApi = {

  getCardsPack(requestData: reqDataType) {
    return instance.get(`/cards/pack`,
        {params: {...requestData}})
        .then(res => {
          return res.data
        })
  },
};