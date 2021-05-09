import {Favorite, User} from '../models'
import {knex} from '../db'

export function getAllFavorites() {
    return Favorite.fetchAll()
}

export function getFavoritesByUser(userId) {
    return new User({id: userId}).favorites.fetch()
}

export function addFavorite(favorite) {
    return new Favorite(favorite).save()
}

export function searchFavorites(favoriteName) {
    return new Favorite().where('name', 'LIKE', `%${favoriteName}%`).fetchAll()
}

export function bulkInsertUserFavorite(userId, favoriteIds = []) {
    const userFavorites = favoriteIds.map(favoriteId => ({user: userId, favorite: favoriteId}));
    return knex('UserFavorite').where('user', '=', userId).delete().then( () => 
        knex('UserFavorite').insert(userFavorites)
    )
    .then(() => getFavoritesByUser(userId))
    
    
}