import express from 'express';
import auth from './controllers/auth';
import user from './controllers/user';

const router = express.Router();

router.post('/login', auth.login);
router.delete('/logout', auth.logout);

router.get('/user/:userId', auth.checkToken, user.getUser);
router.put('/user', auth.checkToken, user.createUser);
router.post('/user/:userId', auth.checkToken, user.editUser);
router.delete('/user/:userId', auth.checkToken, user.deleteUser);

export default router;