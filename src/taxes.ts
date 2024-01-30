/**
 * Personal Tax Bracket - main
 * @module
*/


/**
 * Represents a Personal Income Tax calculator for the Federal, New York State, or New York City level based on user income and governmental body.
 * The class contains methods to calculate marginal tax liability and rate on a progressive tax system. It also provides a method that summarizes tax liability based on the initialized tax brackets.
 * @property {number} income - User input. adjustable taxable income after deductions
 * @property {string} govBody - User input. The government body (federal, state, or city) for which the taxes are being calculated
 * @property {number} year - User input. The year of the desired tax brackets 
 * @property {TaxBracket[]} fed - An array of federal tax brackets used to calculate federal taxes
 * @property {TaxBracket[]} state - An array of New York State tax brackets used to calculate state taxes
 * @property {TaxBracket[]} city - An array of New York City tax brackets used to calculate city taxes
 */
class PersonalIncomeTax {
    // instance property assignments
    income: number
    govBody: string
    year: number
    fed: TaxBracket[]
    state: TaxBracket[]
    city: TaxBracket[]

    /**
     *  Define instance properties
     * @param income 
     * @param govBody 
     * @param year 
     */
    constructor(income: number, govBody: ('federal' | 'state' | 'city'), year: keyof typeof years){
        this.income = income
        this.govBody = govBody
        this.year = year

        this.fed = years[year].fed
        this.state = years[year].state
        this.city = years[year].city
    }

    /**
     * Returns the calculated marginal tax liability for the year
     * @returns {number} tax liability
     */
    calculateMarginalTaxLiability(): number {
        const taxBrackets = this.getTaxBrackets()
      
        let remainingIncome = Math.round(this.income)
        let taxLiability = 0
    
        for(let i = 0; i < taxBrackets.length; i+=1){
            const {maxIncome, minIncome, rate} = taxBrackets[i]
            const bracketDiff = maxIncome - minIncome
    
            if(maxIncome === Infinity || remainingIncome < bracketDiff){
                taxLiability += (remainingIncome * rate)
                remainingIncome -= remainingIncome
            }else if(remainingIncome > bracketDiff){
                taxLiability += (bracketDiff * rate)
                remainingIncome -= bracketDiff
            }
            if(!remainingIncome) break
    
        } 
    
        return Math.round(taxLiability)
    }

    /**
     * Based on the initialized govBody ('federal', 'state', or 'city') as a string, this method returns the appropriate govering body tax bracket
     * @returns {TaxBracket[]} an array representing the govering body's tax bracket
     */
    getTaxBrackets(): TaxBracket[] {
        // Uses the tax bracket
        switch (this.govBody) {
            case "federal":
                return this.fed  
            case "state":
                return this.state 
            case "city":
                return this.city    
            default:
                return []
        }
    }

    /**
     * Returns the marginal tax rate for my income
     * @return {number} marginal tax rate.
    */
    getMarginalTaxRate(): number{
        const taxBrackets = this.getTaxBrackets()
        const oneTaxBracket = taxBrackets.filter(({minIncome, maxIncome}) => {
            return this.income > minIncome && this.income < maxIncome
        })[0]
        if(oneTaxBracket?.rate){
            return Number((oneTaxBracket.rate * 100).toFixed(2))
        }
        return 0
    }

    /**
     * Returns a summary of initialized tax info as a string
     * @return {string}
     */
    summarizeTaxLiability(): string{
        const marginalTaxRate = this.getMarginalTaxRate()
        const marginalTaxLiability = this.calculateMarginalTaxLiability()

        return `${this.govBody.capitalize()} Taxable Income of $${this.income} for ${this.year}: marginal tax rate is ${marginalTaxRate}% and the tax liability is $${marginalTaxLiability}.`
    }

}

/**
 * EXAMPLE: Adjustable Taxable Income
 * Uncomment the below lines and insert your desired amount 
 */
// const fedIncome = 7986.24; // insert your adjustable taxable income for federal
// const stateIncome = 7936.24; // insert your adjustable taxable income for state
// const cityIncome = 7936.24; // insert your adjustable taxable income for city
// const taxYear = 2023; // insert the tax year you earned the above income

// const myFed = new PersonalIncomeTax(fedIncome,'federal', taxYear )
// const myState = new PersonalIncomeTax(stateIncome,'state', taxYear)
// const myCity = new PersonalIncomeTax(cityIncome,'city', taxYear)

// console.log(myFed.summarizeTaxLiability())
// console.log(myState.summarizeTaxLiability())
// console.log(myCity.summarizeTaxLiability())