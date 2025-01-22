import { body } from 'express-validator';

export const createStartValidator = [
  body('price')
    .exists()
    .withMessage('Price is required')
    .trim()
    .isInt({
      min: 0,
    })
    .withMessage('Invalid price number'),
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isAlpha('vi-VN', { ignore: ' ' })
    .withMessage('Title must not contains special characters'),
];
