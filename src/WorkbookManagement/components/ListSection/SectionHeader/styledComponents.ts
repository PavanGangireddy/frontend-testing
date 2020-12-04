import tw, { css, styled } from 'twin.macro'

import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo16BlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../../Common/styleGuide/Typos'

export const SectionHeaderContainer = styled.div`
   ${tw`
        flex items-center justify-between px-6px py-9px bg-white
    `}
`

export const ListMenuContainer = styled.div`
   ${tw`bg-white p-16px  rounded-16px shadow-breadCrumbShadow border border-lightBlueGrey`}
`

export const ListMenuItem = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`flex items-center leading-3 py-12px px-16px cursor-pointer hover:text-brightBlue hover:bg-brightBlue10 rounded-8px mb-8px last:mb-0px`}
`

export const SectionTitleAndIconContainer = styled.div`
   ${tw`
        flex items-center w-full
    `}
`

export const SectionTitleTypo = styled(Typo16BlueGreyHKGroteskSemiBold)`
   ${tw`
        ml-4px leading-none
    `}
`

export const SectionNameStyles = css`
   ${tw`px-8px m-8px h-28px`};
`

export const ToggleAndMoreIconContainer = styled.div`
   ${tw`
        flex items-center
    `}
`

export const ButtonContainer = styled.div`
   ${tw`
      cursor-pointer
   `}
`

export const ToggleButtonContainer = styled(ButtonContainer)`
   ${tw`
        mr-10px
    `}
`

export const SectionDragHandle = styled.div``

export const MoveSectionHeader = styled.div`
   ${tw`flex items-center justify-between w-full px-24px h-65px border-0 border-b border-solid border-lightBlueGrey`}
`

export const MoveSectionHeaderTitle = styled(
   Typo12DarkBlueGreyHKGroteskSemiBold
)`
   ${tw`uppercase`}
`

export const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`

export const TitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const nonEditableTextCSS = {
   width: 'auto',
   cursor: 'text',
   pointerEvents: 'auto'
}

export const nonEditableTextCSSWithDisabledActions = {
   width: 'auto',
   pointerEvents: 'none'
}

export const nonEditableTextContainerCSS = css`
   ${tw`pointer-events-none pl-10px`}
`
