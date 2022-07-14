import {instance} from "./api";

export type PackType = {
    cards: number;
    lastUpdated: number;
    createdBy: string;
    actions: number;

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
    created: Date
    updated: Date
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
    order?: number
    orderBy?: string
}

export const packsApi = {

    getCardsPack(requestData: reqDataType) {
        return instance.get(`/cards/pack`,
            {params: {...requestData}})
            .then(res => {
                return res.data;
            });
    },
    addNewPack(name: string, makePrivate: boolean) {
        return instance.post(`/cards/pack`,
            {cardsPack: {name, private: makePrivate}});
    },
    deleteCardsPack(packId: string) {
        return instance.delete(`/cards/pack?id=${packId}`);
    },
    changeCardsPackName(_id: string, name: string) {
        return instance.put(`/cards/pack`, {cardsPack: {_id, name}});
    }
};