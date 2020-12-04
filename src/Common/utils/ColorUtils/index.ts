import { labelColors } from '../../constants/LabelColorConstant'
import { ColorsProps } from '../../components/ColorPalette'

const allIntensityColors = labelColors.map(color => color.intensityColors)

export const getIntensityColors = (colorName: string): Array<ColorsProps> => {
   let currentIntensityColors!: Array<ColorsProps>
   let isColorFound = false
   for (let i = 0; i < allIntensityColors.length; i++) {
      for (let j = 0; j < allIntensityColors[i].length; j++) {
         if (allIntensityColors[i][j].backgroundColor === colorName) {
            isColorFound = true
            currentIntensityColors = allIntensityColors[i]
            break
         }
      }
      if (isColorFound) {
         break
      }
   }
   return currentIntensityColors
}

export const getTextColor = (colorName: string | null): string | null => {
   let getColor = labelColors.find(
      item => item.colors.backgroundColor === colorName
   )
   if (getColor) return getColor.colors.textColor

   getColor = labelColors.find(item =>
      item.intensityColors.find(item => item.backgroundColor === colorName)
   )
   if (getColor) {
      const getIntensityTextColor = getColor.intensityColors.find(
         item => item.backgroundColor === colorName
      )
      if (getIntensityTextColor) return getIntensityTextColor.textColor
      return null
   }
   return null
}
