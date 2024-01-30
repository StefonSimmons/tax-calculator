/**
 * Defines a type which represents a tax bracket for a progressive tax system.
 * `minIncome`: a number representing the minimum income threshold for this tax bracket
 * `maxIncome`: a number representing the maximum income threshold for this tax bracket
 * `rate`: a number representing the tax rate for this tax bracket, expressed as a decimal between 0 and 1.
 */
type TaxBracket = {
    minIncome: number, maxIncome: number, rate: number
}