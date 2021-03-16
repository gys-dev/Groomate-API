import { Router } from 'express';

import swaggerSpec from '../utils/swagger';
import userRoutes from './userRoutes';
import playgroundRouters from './playgroundRoutes';
import majorRouters from './majorRouters';
import favorteRouters from './favoritesRouters';
import suggestRouters from './suggestRouters';
import groupRouters from './groupRouters';
import chatRouters from './chatRouters';


/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', userRoutes);
router.use('/playground', playgroundRouters);
router.use('/school', majorRouters);
router.use('/favorites', favorteRouters);
router.use('/suggest', suggestRouters);
router.use('/groups', groupRouters);
router.use('/chats', chatRouters);


export default router;
