import colors from 'colors'

import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.blue.bold(`Server listening in port ${port}.`));
})

let product = {
    id: 1,
    price: 30,
    name: 'Tablet'
}