import { Router } from 'express';

import { findUser, userValidator } from '../validators/userValidator';
import auth from '../middlewares/auth'
import {
    User,
    Favorite
} from '../models'

const router = Router();

router.get('/', async (req, res) => {
    const user  = new Favorite({id: 2}).users;
    user.fetch({debug: true})
    .then(u => {
        res.json(u)
    });
   
})

export default router;
