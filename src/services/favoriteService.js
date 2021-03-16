import {Favorite, User} from '../models'

export function getAllFavorites() {
    return Favorite.fetchAll()
}

export function getFavoritesByUser(userId) {
    return new User({id: userId}).favorites.fetch()
}

export function addFavorite(favorite) {
    return new Favorite(favorite).save()
}