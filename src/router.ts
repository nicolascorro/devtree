import { Router } from 'express'
const router = Router()

// Routing
router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/auth/register', (req, res) => {
    console.log(req.body);
})

export default router