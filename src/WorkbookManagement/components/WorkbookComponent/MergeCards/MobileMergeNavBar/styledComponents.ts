import tw, { styled, TwStyle } from 'twin.macro'

import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo18WhiteHKGroteskRegular
} from '../../../../../Common/styleGuide/Typos'
import Button from '../../../../../Common/components/Button'

export const MobileMergeNavBarContainer = styled.div`
   ${tw`
       
    `}
`

export const LeftEnhancerContainer = styled.div`
   ${tw`
        flex
    `}
`

export const NextButton = styled(Button)`
   ${tw`
        py-8px px-20px border-white bg-transparent
    `}
`
export const RightEnhancerContainer = styled.div`
   ${tw`
        
    `}
`
export const NavBarTitleInMergeCard = styled(Typo18WhiteHKGroteskRegular)`
   margin-left: 16px;
`

export const TitleText = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
        ml-6px uppercase
    `}
`
export const NavbarBody = styled.div``

export const navBarCss = tw`flex justify-between static`
