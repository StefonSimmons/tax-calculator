declare global {
    /**
     * Declares the String prototype extension in the global scope
     */
    interface String{
        /**
         * String.prototype.capitalize() - 
         * The `capitalize` method returns the value of the string - capitalizing the first letter of a string and converts the rest of the characters to lowercase.
         * @example
         * ```ts
         * console.log("virginia".capitalize()); // 'Virginia'
         * ```
         * @returns {string} A new string representing the calling string converted to capitalized case.
         */
        capitalize(): string;
    }
}

String.prototype.capitalize = function () {
    return `${this[0].toUpperCase()}${this.toLowerCase().slice(1)}`
}

export {}