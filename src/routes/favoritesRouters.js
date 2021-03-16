import {Router} from 'express'
import * as favoriteController from '../controllers/favorite'
import auth from '../middlewares/auth'


const router = Router();


router.get('/', favoriteController.getAllFavorite)
router.get('/getFavoriteByUser', auth, favoriteController.getFavoritesByUser) 
router.post('/', auth, favoriteController.addFavoritesUser)

export default router;