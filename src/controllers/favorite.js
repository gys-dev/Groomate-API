import * as favoriteServices from '../services/favoriteService'

export function getAllFavorite(req, res, next) {
    favoriteServices.getAllFavorites()
    .then(data => res.json({data}))
    .catch(error => next(error))
}

export function getFavoritesByUser(req, res, next) {
    const authUser = res.locals.authUser;

    favoriteServices.getFavoritesByUser(authUser.id)
    .then(data => res.json({data}))
    .catch(error => next(error))
}

//TODO: Add Favorite
export function addFavoritesUser(req, res, next) {
    const body = req.body;
    favoriteServices.addFavorite(body)
    .then(data => res.json({data}))
    .catch(error => next(error))
}