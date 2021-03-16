import * as suggestServices from '../services/suggestService';
import * as favoriteServices from '../services/favoriteService';
import * as userServices from '../services/userService';
import * as groupServices from '../services/groupService';
import _ from 'lodash'
import getDistance from 'geolib/es/getDistance';


export async function getSuggestMatchUser(req, res, next) {
   try {
    const authUser = res.locals.authUser;
    // fetch only 20 user
    const paginUsers = await userServices.getUsersWithFavoriteRelate(1, 2, authUser.id)
    

    const userFavoritesObject = await favoriteServices.getFavoritesByUser(authUser.id)
    const userFavorites = userFavoritesObject.map(item => item.attributes);

    // caculate total match between 2 user
    // and then return same paginUsers with point field after calculate

    const preSortUsers = paginUsers.map(perUser => {
        const targetFavorites = perUser.favorites;
        const matchPoint = caculateMatchPointFavorite(userFavorites, targetFavorites);
        perUser.total_point = matchPoint;
        return perUser;
    })
    
    // sort vie total match
    const sortUsers = _.orderBy(preSortUsers, ['total_point'], ['desc'])
    res.json({data: sortUsers})
   } catch(e) {
       next(e)
   }

}

export function getSuggestMatchGroup(req, res, next) {

    groupServices.getSuggestGroup(1)
    .then(data => res.json({data}))
    .catch(err => next(err))

}

export async function getSuggestMatchLocation(req, res, next) {
    try {
        const authUser = res.locals.authUser;

        const listSuggestUser = await userServices.getUserViaLocationMatch(1,1, authUser.id);
        const listUser = listSuggestUser.map(item => item.attributes);

        const listDistanceUser = listUser.map(user => {
            const currentUserDistance = JSON.parse(authUser.location);
            const inteLocation = JSON.parse(user.location);
   
            let distance = 9999999999;
            if (currentUserDistance && inteLocation) {
                distance = getDistance(currentUserDistance, inteLocation);
                user.distance = distance;
            } else {
                user.distance = 0;
            }
        

            return user;
        })

        const sortedDistanceUser = _.orderBy(listDistanceUser, ['distance'], ['asc']);

        res.json(sortedDistanceUser);
    } catch (err) {
        next(err);
    }
   
}

function caculateMatchPointFavorite(sourceUser, targetUser) {
   
    const interceptFavors = _.intersectionBy(targetUser, sourceUser, _.isEqual)

    const removeFn = (item) => {
        return interceptFavors.find(interceptItem => interceptItem.id == item.id)
    }

    const copySource = [...sourceUser];
    const copyTarget = [...targetUser];
    _.remove(copySource, removeFn)
    _.remove(copyTarget, removeFn);

    const sourceSumPoint = _.sumBy(copySource, 'match_point');
    const targetSumPoint = _.sumBy(copyTarget, 'match_point');
    if (interceptFavors.length > 0) {
        const mapBonusPoint = interceptFavors.map(item => item.match_point * 1000);
        const bonusIntercept = mapBonusPoint.reduce((seed, num) => seed + num)
        return sourceSumPoint + targetSumPoint + bonusIntercept
    }
    
    return sourceSumPoint + targetSumPoint

   
}