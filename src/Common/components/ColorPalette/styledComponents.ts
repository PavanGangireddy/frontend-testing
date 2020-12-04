import tw, { styled, TwStyle, css } from 'twin.macro'

import {
   Typo14SteelHKGroteskBold,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../styleGuide/Typos'

import { LabelColor } from './index'
interface SelectedColorProps {
   selectedColor: LabelColor
}

export const ColorPaletteWrapper = styled.div`
   ${tw`flex`} //TODO:check the width
`

export const ColoredLabelWrapper = styled.div`
   ${tw`flex flex-wrap m-4px w-120px`}
`

export const SelectedColor = styled.div<SelectedColorProps>`
   ${props => ({
      backgroundColor: props.selectedColor.backgroundColor,
      border: `1px solid ${props.selectedColor.borderColor}`
   })}
   ${tw`m-4px ml-0 w-32px md:w-30px h-24px md:h-36px mr-4px mb-4px justify-end flex rounded-2px `}
`

export const ArrowContainer = styled.div`
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer`}
   ${tw`flex items-center pl-2px`}
   ${({ shouldShowIntensityColors }) =>
      shouldShowIntensityColors
         ? `transform: rotate(0deg)`
         : `transform: rotate(180deg)`}
`

export const Label = styled(Typo14SteelHKGroteskBold)`
   ${tw`uppercase`}
`

export const Container = styled.div`
   ${tw`flex flex-col`}
`

export const IntensityColors = styled.div`
   ${tw`flex w-104px h-27px ml-4px border border-solid border-steel60`}
`

export const ColorBox = styled.div`
   ${props => ({
      backgroundColor: props.similarColor.backgroundColor,
      border: `1px solid ${props.similarColor.borderColor}`
   })}
   ${tw`w-24px h-24px cursor-pointer`}
`

export const MobileColorsContainer = styled.div`
   ${tw`flex flex-col w-full max-h-full overflow-y-scroll p-8px`}
`

export const IntensityColorBox = styled.div`
   ${tw`w-32px h-32px rounded-4px`};
   ${props => ({
      backgroundColor: props.backgroundColor,
      border: `1px solid ${props.borderColor}`
   })}
   &:hover {
      ${tw`border-2 border-solid border-black transition-transform duration-200`}
      transform:scale(1.2,1.2)
   }
`

export const SingleColorList = styled.div`
   ${tw`flex justify-between my-12px`}
`

export const ColorsList = styled.div`
   ${tw`flex flex-col flex-1`};
`

export const HeaderTitle = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``
