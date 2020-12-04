import tw, { styled } from 'twin.macro'

import { Typo18DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'

import Colors from '../../themes/Colors'
import { sizes, types, variants, labelColors } from './constants'

const color = labelColors

interface ImageProps {
   size: string
   variant: string
}
interface UserNameProps {
   size: string
   type: string
   variant: string
}
const getSizeStyles = (size: string) => {
   switch (size) {
      case sizes.extraSmall:
         return tw`h-32px w-32px`

      case sizes.small:
         return tw`h-40px w-40px`

      case sizes.medium:
         return tw`h-48px w-48px`

      case sizes.large:
         return tw`h-64px w-64px`

      case sizes.extraLarge:
         return tw`w-80px h-80px`
   }
}

const getSizeStylesForText = (size: string) => {
   switch (size) {
      case sizes.extraSmall:
         return tw`text-14px`
      case sizes.small:
         return tw`text-14px`
      case sizes.medium:
         return tw`text-18px`
      case sizes.large:
         return tw`text-20px`
      case sizes.extraLarge:
         return tw`text-24px`
   }
}

const getTypeStyles = type => {
   switch (type) {
      case types.outline:
         return {
            background: Colors.white,
            border: `1px solid ${color.backgroundColor}`
         }

      default:
         return {
            background: color.backgroundColor
         }
   }
}
const getVariantStyles = (variant: string) => {
   switch (variant) {
      case variants.square:
         return tw`rounded-sm `
      default:
         return tw`rounded-full`
   }
}

export const Image = styled.img<ImageProps>`
   ${tw`flex justify-center items-center`}
   ${({ size }) => getSizeStyles(size)};
   ${({ variant }) => getVariantStyles(variant)};
   object-fit: contain;
`

export const UserName = styled(Typo18DarkBlueGreyHKGroteskMedium)<
   UserNameProps
>`
   ${tw`flex justify-center items-center`}
   ${({ size }) => getSizeStyles(size)};
   ${({ size }) => getSizeStylesForText(size)};
   ${({ variant }) => getVariantStyles(variant)};
   ${({ variant, type }) =>
      variant === variants.circle
         ? getTypeStyles(types.filled)
         : getTypeStyles(type)};
   ${({ variant, type }) =>
      variant === variants.square && type === types.filled
         ? { color: Colors.white }
         : { color: color.textColor }} //TODO:need to update all in to tailwind
`
