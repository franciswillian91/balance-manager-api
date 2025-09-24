const allowedOperations = ['deposit','withdraw','transfer']

export const allowedOperationsValidator = ()=>{
    return (req, res, next) => {
        if(req.method === 'GET'){
            const {account_id} = req.query
            if(!account_id) return res.status(400).send('Unsuported operation')
            return next()
        }
        
        const {type,destination,origin,amount} = req.body

        if(
            !allowedOperations.includes(type) ||
            (
                (type === 'deposit' && (!destination || !amount)) ||
                (type === 'withdraw' && (!origin || !amount)) ||
                (type === 'transfer' && (!destination || !origin || !amount))
            )
        ) return res.status(400).send('Unsuported operation')
        next()        
    };
}