import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Неверный Email').isEmail(),
    body('password', 'Неверный пароль').isLength({ min: 5}),
    body('fullName', 'Имя из одной буквы?').isLength({min: 2}),
    body('avatarUrl', 'Пустота в место ссылки').optional().isURL(),
];

export const loginValidator = [
    body('email', 'Error email or password').isEmail(),
    body('password', 'Error email or password').isLength({ min: 5 }),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
