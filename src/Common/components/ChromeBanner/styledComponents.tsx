import tw, { styled, css } from 'twin.macro'

import { Typo18PrussianBlueHKGroteskMedium } from '../../styleGuide/Typos'
import { mobile } from '../../utils/MixinUtils'

export const BannerContainer = styled.div`
   ${tw`w-screen bg-babyBlue flex items-center fixed `}
   z-index:2000;
`
export const BannerText = styled(Typo18PrussianBlueHKGroteskMedium)`
   ${tw`mr-16px`}
   ${mobile} {
      ${tw`text-14px mr-8px`}
   }
`

export const BannerLeftSection = styled.div`
   ${tw`flex justify-center items-center my-16px`}
   width: 90%;
   ${mobile} {
      ${tw`my-12px ml-16px`}
   }
`

export const BannerRightSection = styled.div`
   ${tw`flex justify-center items-center`}
   width: 10%;
`

export const closeIconContainer = css`
   ${tw`cursor-pointer`}
`
