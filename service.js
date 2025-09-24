export default class Balance{

    constructor(){
        this.accounts = new Map()
    }

    resetAccounts(){
        this.accounts = new Map()
        return true
    }

    getBalanceByAccount(id){
        return this.accounts.get(id)
    }

    processEvent({type,origin,destination,amount}){
        return this[type]({origin,destination,amount})
    }

    deposit(event){
        const currentBalance = this.accounts.get(event.destination) || 0
        const newBalance = Number(currentBalance) + Number(event.amount)

        this.accounts.set(event.destination,newBalance)
        return {
            destination:{
                id:event.destination,
                balance: newBalance
            }
        }
    }

    withdraw(event){
        const currentBalance = this.accounts.get(event.origin)
        const newBalance = Number(currentBalance) - Number(event.amount)

        this.accounts.set(event.origin,newBalance)
        
        return {
            origin:{
                id:event.origin,
                balance: newBalance
            }
        }
    }

    transfer(event){
        const currentOriginBalance = this.accounts.get(event.origin)
        const currentDestinationBalance = this.accounts.get(event.destination)
        const newOriginBalance = Number(currentOriginBalance) - Number(event.amount)
        const newDestinationBalance = Number(currentDestinationBalance) + Number(event.amount)

        this.accounts.set(event.origin,newOriginBalance)
        this.accounts.set(event.destination,newDestinationBalance)
        
        return {
            origin:{
                id:event.origin,
                balance: newOriginBalance
            },
            destination:{
                id:event.destination,
                balance: newDestinationBalance
            }
        }
    }
}