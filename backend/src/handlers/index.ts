import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slugify from 'slugify'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    
    const { email, password } = req.body

    const userExists = await User.findOne({email})
    if (userExists){
        const err = new Error('The user is already registered.')
        return res.status(409).send({error: err.message})
    }

    const handle = slugify(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if (handleExists){
        const err = new Error('Handle not available')
        return res.status(409).send({error: err.message})
    }

    const user = new User(req.body) // Creates a single user (a MDB model)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save() // Saves the created user in the database

    return res.status(201).send('User successfully registered.') // Stops the request and avoids loops
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    if (!user){
        const err = new Error('The user does not exist')
        return res.status(404).send({error: err.message})
    }

    // Check password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect){
        const err = new Error('Wrong password')
        return res.status(401).send({error: err.message})
    }

    return res.send('Authenticated')

}