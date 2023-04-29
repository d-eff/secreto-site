import express from 'express';
import user from './controllers/user';

const router = express.Router();

router.get('/user/:userId', user.getUser);
router.put('/user', user.createUser);
router.post('/user/:userId', user.editUser);
router.delete('/user/:userId', user.deleteUser);

export default router;