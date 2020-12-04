import tw, { styled, TwStyle } from 'twin.macro'

interface ColoredLabelWrapperProps {
   backgroundColor: string
   borderColor: string
}

export const ColoredLabelWrapper = styled.div<ColoredLabelWrapperProps>`
   ${props => ({
      backgroundColor: props.backgroundColor,
      border: `1px solid ${props.borderColor}`
   })}
   ${tw`w-18px h-16px mr-4px mb-4px`}
   border-radius: 2px; //TODO:update all with tailwind
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer`}
`
