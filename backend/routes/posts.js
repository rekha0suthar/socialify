import { Router } from 'express';
import { verifytoken } from '../middleware/auth';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts';

const router = Router();

router.get('/', verifytoken, getFeedPosts);
router.get('/:userId', verifytoken, getUserPosts);

router.patch('/:id/like', verifytoken, likePost);

export default router;
