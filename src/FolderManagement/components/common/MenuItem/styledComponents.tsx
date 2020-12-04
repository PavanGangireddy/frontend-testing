import tw, { styled, TwStyle } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskRegular } from '../../../../Common/styleGuide/Typos'
import { mobile } from '../../../../Common/utils/MixinUtils'

export const MenuItemWrapper = styled.div`
   ${tw`flex items-center rounded-8px  px-16px py-12px mb-8px last:mb-0px`}
   ${({ label }) =>
      label === 'Delete forever'
         ? `&:hover { background:rgba(255, 11, 55, 0.05)}` //TODO:need to add in tailwind config
         : tw`hover:bg-brightBlue10`}
   ${mobile}{
      ${({ hiddenInMobile }): TwStyle =>
         hiddenInMobile ? tw`hidden` : tw`flex`}
      ${tw`mb-5px last:mb-0px px-0px`}
   }

`

export const IconWrapper = styled.div`
   ${tw` w-24px flex justify-center items-center mr-16px`}
`

export const Label = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw` leading-1.71 select-none`}
   ${MenuItemWrapper}:hover & {
      ${({ label }) =>
         label === 'Delete forever' ? tw`text-cherry` : tw`text-blueTwo`}
   }
`
