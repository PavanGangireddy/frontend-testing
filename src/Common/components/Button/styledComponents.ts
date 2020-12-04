import tw, { styled, TwStyle } from 'twin.macro'

import { Typo14WhiteHKGroteskSemiBold } from '../../styleGuide/Typos'

import { variants, sizes, shapes } from './constants'

const { small } = sizes
const { primary, secondary, tertiary } = variants
const { square, pill, round } = shapes
type variant = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
type size = 'SMALL'
type shape = 'SQUARE' | 'PILL' | 'ROUND'

const getVariantStyles = (variant: variant): TwStyle => {
   switch (variant) {
      case primary:
         return tw`text-white border-none bg-blue`
      case secondary:
         return tw`text-darkBlueGrey border-default border-solid border-lightBlueGrey bg-white`
      case tertiary:
         return tw`text-steel border-none bg-transparent`
      default:
         return tw`text-white border-none bg-blue`
   }
}

const getBtnSizeStyles = (size: size): TwStyle => {
   switch (size) {
      case small:
         return tw`py-4px px-16px`
      default:
         return tw`py-8px px-20px`
   }
}

const getShapeStyles = (shape: shape): TwStyle => {
   switch (shape) {
      case pill:
         return tw`rounded-100px`
      case round:
         return tw`rounded-50%`
      case square:
         return tw`rounded-none`
      default:
         return tw`rounded-4px`
   }
}

export const StyledButton = styled.button(
   ({ variant, size, shape, disabled }) => [
      tw`outline-none border-none focus:outline-none`,
      getVariantStyles(variant),
      getBtnSizeStyles(size),
      getShapeStyles(shape),
      disabled ? tw`cursor-not-allowed opacity-50` : tw`cursor-pointer`
   ]
)

export const ButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   line-height: 1.71;
   letter-spacing: normal;
`
