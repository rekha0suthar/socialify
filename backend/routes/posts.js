import { Router } from 'express';
import { verifytoken } from '../middleware/auth.js';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  addPost,
} from '../controllers/posts.js';

const router = Router();

router.post('/', verifytoken, addPost);
router.get('/', verifytoken, getFeedPosts);
router.get('/:userId', verifytoken, getUserPosts);

router.put('/:id/like', verifytoken, likePost);

export default router;
