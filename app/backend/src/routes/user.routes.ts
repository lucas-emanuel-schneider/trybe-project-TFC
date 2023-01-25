import * as express from 'express';
import UserService from '../services/userServices';
import JwtFunctions from '../auth/jwtFunctions';
import UserController from '../controllers/user.controller';
import validateUser from '../middlewares/validateUser';

const Jwt = new JwtFunctions();

const userService = new UserService(Jwt);

const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.post('/', validateUser, userController.login);

userRouter.get('/validate', Jwt.verifyToken, userController.getRole);

export default userRouter;
