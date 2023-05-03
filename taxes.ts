
/**
 * Defines a type which represents a tax bracket for a progressive tax system.
 * minIncome: a number representing the minimum income threshold for this tax bracket
 * maxIncome: a number representing the maximum income threshold for this tax bracket
 * rate: a number representing the tax rate for this tax bracket, expressed as a decimal between 0 and 1.
 */
type TaxBracket = {
    minIncome: number, maxIncome: number, rate: number
}

/**
 * Represents a governmental body, which can be either "federal", "state", or "city".
 * Inherits String object to provide access to String properties and methods   
 */
class GovBody extends String{
    // instance property assignments
    str: ('federal' | 'state' | 'city')

    constructor(govBody: ('federal' | 'state' | 'city')){
        super(govBody) 
        this.str = govBody
    }

    /**
     * Capitalizes the first letter in a string. 
     * @returns {string} a new string with the first letter capitalized and all other letters lowercased
     */
    capitalize(): string {
        return `${this.str[0].toUpperCase()}${this.str.toLowerCase().slice(1)}`
    }
}

/**
 * Represents a Personal Income Tax calculator for the Federal, New York State, or New York City level based on user income and governmental body.
 * The class contains methods to calculate marginal tax liability and rate on a progressive tax system. It also provides a method that summarizes tax liability based on the initialized tax brackets.
 * @property {number} income - The user's input adjustable taxable income after deductions
 * @property {GovBody} govBody - An instance of the GovBody class representing the government body (federal, state, or city) for which the taxes are being calculated
 * @property {TaxBracket[]} fedTaxBrackets - An array of federal tax brackets used to calculate federal taxes
 * @property {TaxBracket[]} nyTaxBrackets - An array of New York State tax brackets used to calculate state taxes
 * @property {TaxBracket[]} nycTaxBrackets - An array of New York City tax brackets used to calculate city taxes
 */
class PersonalIncomeTax {
    // instance property assignments
    income: number
    govBody: GovBody
    fedTaxBrackets: TaxBracket[]
    nyTaxBrackets: TaxBracket[]
    nycTaxBrackets: TaxBracket[]

    constructor(income: number, govBody: ('federal' | 'state' | 'city')){
        this.income = income
        this.govBody = new GovBody(govBody)

        // 2022 tax brackets
        this.fedTaxBrackets = [
            { minIncome: 0, maxIncome: 10275, rate: 0.1 }, 
            { minIncome: 10275, maxIncome: 41775, rate: 0.12 },
            { minIncome: 41775, maxIncome: 89075, rate: 0.22 },
            { minIncome: 89075, maxIncome: 170050, rate: 0.24 },
            { minIncome: 170050, maxIncome: 215950, rate: 0.32 },
            { minIncome: 215950, maxIncome: 539900, rate: 0.35 },
            { minIncome: 539900, maxIncome: Infinity, rate: 0.37}
        ];

        this.nyTaxBrackets = [
            { minIncome: 0, maxIncome: 8500, rate: 0.04 }, 
            { minIncome: 8500, maxIncome: 11700, rate: 0.045 },
            { minIncome: 11700, maxIncome: 13900, rate: 0.0525 },
            { minIncome: 13900, maxIncome: 80650, rate: 0.0585 },
            { minIncome: 80650, maxIncome: 215400, rate: 0.0625 },
            { minIncome: 215400, maxIncome: 1077551, rate: 0.0685 },
            { minIncome: 1077550, maxIncome: 5000000, rate: 0.0965 },
            { minIncome: 5000000, maxIncome: 25000000, rate: 0.103 }, 
            { minIncome: 25000000, maxIncome: Infinity, rate: 0.109 }
        ];

        this.nycTaxBrackets = [
            { minIncome: 0, maxIncome: 12000, rate: 0.03078 }, 
            { minIncome: 12000, maxIncome: 25000.01, rate: 0.03762 },
            { minIncome: 25000, maxIncome: 50000, rate: 0.03819 },
            { minIncome: 50000, maxIncome: Infinity, rate: 0.03876 }
        ];
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
        switch (this.govBody.toLowerCase()) {
            case "federal":
                return this.fedTaxBrackets  
            case "state":
                return this.nyTaxBrackets 
            case "city":
                return this.nycTaxBrackets    
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
        const oneTaxBracket = taxBrackets.find(({minIncome, maxIncome}) => {
            return this.income > minIncome && this.income < maxIncome
        })
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

        return `${this.govBody.capitalize()} Taxable Income of $${this.income} per year: marginal tax rate is ${marginalTaxRate}% and the tax liability is $${marginalTaxLiability}.`
    }

}

// // EXAMPLE: Adjustable Taxable Income
// const fedIncome = 22806;
// const stateIncome = 25936;
// const cityIncome = 25936;

// const fed = new PersonalIncomeTax(fedIncome,'federal')
// const state = new PersonalIncomeTax(stateIncome,'state')
// const city = new PersonalIncomeTax(cityIncome,'city')

// console.log(fed.summarizeTaxLiability())
// console.log(state.summarizeTaxLiability())
// console.log(city.summarizeTaxLiability())