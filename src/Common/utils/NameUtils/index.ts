export const getFirstTwoLettersInUpperCase = (name: string): string =>
   name.slice(0, 2).toUpperCase()

export const trimName = (name: string, maxLength: number): string => {
   if (name.length > maxLength) {
      return `${name.slice(0, maxLength - 3)}...`
   }
   return name
}
