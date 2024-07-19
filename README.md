# Personal Income Tax Calculator
Calculate personal income tax liability and rate based on the governing body (federal, state, or city) and the associated tax brackets. Currently, this script only performs calculations for folks who are **single or married filing separately**.
I originally wrote this calculator in JavaScript, but decided to convert it to TypeScript.

# Usage
Fork, clone repo, cd into the `tax-app` directory

First Time Run
- `npm install -g ts-node`
- `npm install`

Run the Program
- open `src/taxBracketsByYear.ts`
  - update the `years` object to include your desired tax brackets by year for folks who are **single or married filing separately**
  - by default, the **New York, NY** brackets for **2022** and **2023** are included.
- open `taxes.ts`
- uncomment the following lines in `taxes.ts`


```js
// const fedIncome = 7986.24; // insert your adjustable taxable income for federal
// const stateIncome = 7936.24; // insert your adjustable taxable income for state
// const cityIncome = 7936.24; // insert your adjustable taxable income for city
// const taxYear = 2022; // insert the tax year you earned the above income

// const myFed = new PersonalIncomeTax(fedIncome,'federal', taxYear )
// const myState = new PersonalIncomeTax(stateIncome,'state', taxYear)
// const myCity = new PersonalIncomeTax(cityIncome,'city', taxYear)

// console.log(myFed.summarizeTaxLiability())
// console.log(myState.summarizeTaxLiability())
// console.log(myCity.summarizeTaxLiability())
```

- `npm start`

## Takeaways
TypeScript is a strictly-typed language that allows for a safer and easily maintainable developer experience. It's safer because it allows for better type-related error detection and prevention at compile time, reducing the likelihood of runtime errors. This also helps reduce the number of tests needed as seperate processes for quality assurance. Finally, since TypeScript makes the types of variables and methods explicit, it helps with writing code documentation. This can lower the barrier of entry for other developers to read and understand your code so they may contribute or utilize your tools for their own needs.

## Docs
[https://stefonsimmons.github.io/tax-calculator](https://stefonsimmons.github.io/tax-calculator/)


## Libraries
- **typedoc:** a documentation generator for TypeScript 
- **ts-node:** transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling 
