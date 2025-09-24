import express from 'express'
import { allowedOperationsValidator } from './validator.js'
import Balance from './service.js'
const router = express.Router()

const balanceInstance = new Balance()

router.get('/balance',allowedOperationsValidator(),(req,res)=>{
    const {account_id} = req.query
    try {
        const balance = balanceInstance.getBalanceByAccount(account_id)
        if(!balance) return res.status(404).send(0)

        return res.status(200).send(balance)
    } catch (error) {
        console.log(error)
        return res.status(400).send('Fail to perform request')
    }    
})

router.post('/event',allowedOperationsValidator(),async(req,res)=>{
    const {type,destination,origin,amount} = req.body
    try {
        const balance = balanceInstance.processEvent({type,destination,origin,amount})
        
        if(!balance) return res.status(404).send(0)
        return res.status(201).json(balance)
    } catch (error) {
        console.log(error)
        return res.status(400).send('Fail to perform request')
    }
})

router.post('/reset',(req,res)=>{
    balanceInstance.resetAccounts()
    return res.status(200).send('OK')
})

export default router