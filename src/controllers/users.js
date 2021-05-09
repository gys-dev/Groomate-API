import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';
import jwt from 'jsonwebtoken'
import genHash, {hashMD5} from '../utils/genHash'
import * as groupService from '../services/groupService';
import '../env';
import Utils from '../utils/utils';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  userService.verifyAccessToken(req.body.access_token)
  .then(fbUserData => {
    req.body.email = fbUserData.email;
    req.body.gender = fbUserData.gender;
    userService
    .createUser(req.body)
    .then(data => {
      let user = data.attributes;

      const payload = {...user};
      jwt.sign(payload, process.env.APP_JWT_PRIVATE_KEY,  {}, (err, token) => {
        if (!err) {
          res.status(HttpStatus.CREATED).json(Object.assign(user, {token}));
        } else {
          next(err)
        }
      })

    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
 
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteUser(req, res, next) {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}


export async function loginUser(req, res, next) {
  let body = req.body;
  let userId = body.id;
  let access_token = body.access_token;

  try {
    let rawUser = await userService
    .login(userId, access_token);

    let user = rawUser.attributes;
    const group = await groupService.groupByUser(user.id);

    let payload = {...user};
    if (group) {
      const groupIndentify = hashMD5(`group_${group.attributes.id}`);
      payload = {...user, groupId: groupIndentify};
    }

    jwt.sign(payload, process.env.APP_JWT_PRIVATE_KEY,  {}, (err, token) => {

      if (!err) {
        res.status(HttpStatus.OK)
        res.json(Object.assign(user, {token}));
      } else {
        next(err)
      }
    
    })


  } catch(err) {
    next(err)
  }

}

export async function updateMe(req, res, next) {
  try {
    const authUser = res.locals.authUser;
    const file = req.file;
    const body = req.body;
    let path;
    if (file) {
      const fileName = file.filename;
      path = Utils.getHostURL(req) + '/images/' + fileName;

    } 

    let updateBody = {
      ...body,
    };
    if (path) {
      updateBody.picture = path;
    }

    const updateUser = await userService.updateUser(authUser.id, updateBody);

    res.json({data: updateUser});
  } catch(err) {
    next(err)
  }
}

export async function deactivaAcccount(req, res, next) {
    const authUser = res.locals.authUser;
    const {active} = req.body;

    userService.updateUser(authUser.id, {active: active})
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

export async function checkUserExis(req, res, next) {
  const id = req.query.id;
  userService.getUser(id)
  .then(data => {
    res.json({
      status: "Fail",
      code: 0,
      message: "User Exist"
    })
  })
  .catch(error => {
     res.json({
      status: "OK",
      code: 1,
      message: "Ok to create user"
    })
  })
}

export async function fetchMe(req, res, next) {
  try {
    const token = req.header('token');
    const decoded = jwt.verify(token, "randomthing");
    const userId = decoded.id;

    userService.getUser(userId)
    .then(data => res.json({ data }))
    .catch(err => next(err));

  } catch(err) {
    next(err)
  }
}

