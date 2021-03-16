import Boom from '@hapi/boom';
import _isEmpty from 'lodash/isEmpty';
import {User} from '../models'
/**
 * Middleware to handle user exist for register
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
export default async function userExist(req, res, next) {

 const userId = req.body.id;
 new User({id: `${userId}`}).fetch()
 .then(user => {
    const error = {code: 1000, message: "User is exist!!!"}
    res.json(error)
 })
 .catch(e => {
     next();
 })
}

  
