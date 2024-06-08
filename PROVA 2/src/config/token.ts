import fs from 'fs'

const privateKey = fs.readFileSync('./src/keys/private.key')

export default privateKey