import { Router } from 'express';
import { verifytoken } from '../middleware/auth.js';
import {
  addOrRemoveFriend,
  getUser,
  getUserFriends,
} from '../controllers/users.js';

const router = Router();

router.get('/:id', verifytoken, getUser);
router.get('/:id/friends', verifytoken, getUserFriends);
router.patch('/:id/friend/:friendId', verifytoken, addOrRemoveFriend);

export default router;
