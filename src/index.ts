import express from 'express'

const app = express()
const PORT = 4401

app.get('/',(req,res)=>{
    res.send('Hi there')

})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
