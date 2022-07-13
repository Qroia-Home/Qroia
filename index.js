import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

import checkAuth from './utils/checkAuth.js';
import { loginValidator, registerValidator } from './validations/auth.js';
import { register, login, getMe } from './controllers/UserContoller.js';
import PostController from './controllers/PostContoller.js';

//INFO: Init general consts
const mono_url = config.get('mongo_uri');
mongoose.connect(
    ''
).then(() => console.log('DB_OK'))
.catch((err) => console.log('DB_ERROR', err));
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hdsfsfello worlds');
});

app.post('/auth/login', loginValidator, login); //INFO: Login

app.post('/auth/register', registerValidator, register); //INFO: POST Method create account

app.get('/auth/me', checkAuth, getMe); //INFO: Get User

//INFO: Post Method`s
app.get('/posts', PostController.getAll); //INFO:
app.get('/post/:id', PostController.getFromId);
app.post('/posts', PostController.create);
app.delete('/posts/:id', removeValidator, PostController.remove);
app.patch('/posts/:id', PostController.update);


app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('OK');
});
