import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

// Routing

router.post('/auth/register',
    body('handle') // enters the Body of the request and search for the ('handle') key and checks if it's empty
        .notEmpty()
        .withMessage('The handle must not be empty.'),
    body('name')
        .notEmpty()
        .withMessage('The name must not be empty.'),
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('The password is too short. Minimum 8 characters'),
    handleInputErrors,
    createAccount)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('The password is mandatory.'),
    handleInputErrors,
    login
)
export default router