import express from 'express';
import auth from './controllers/auth';
import user from './controllers/user';

const router = express.Router();

router.post('/login', auth.login);
router.delete('/logout', auth.logout);

router.get('/user/:userId', user.getUser);
router.put('/user', user.createUser);
router.post('/user/:userId', user.editUser);
router.delete('/user/:userId', user.deleteUser);

export default router;