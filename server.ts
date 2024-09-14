import express from 'express'
import { handler } from './src/handler'

const app = express()
app.use(express.json())

app.post('/gerar-pdf', (req, res) => {
    handler(req, res)
})

app.listen(9999, () => {
    console.log('Server running')
})


