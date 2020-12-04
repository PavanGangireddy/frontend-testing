import tw, { styled, css, TwStyle } from 'twin.macro'

import {
   Typo14SteelHKGroteskRegular,
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo18DarkBlueGreyHKGroteskMedium
} from '../../../../Common/styleGuide/Typos'

export const ListHeaderContainer = styled.div`
   ${tw`
        flex justify-between bg-lightSkyBlue p-16px rounded-8px rounded-b-none border-0 border-b border-lightBlueGrey
    `}
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const LeftSection = styled.div`
   ${tw`
        flex items-center
    `}
`

export const ListName = styled(Typo18DarkBlueGreyHKGroteskMedium)``

export const RightSection = styled.div`
   ${tw`
        flex items-center
    `}
`

export const AddListButtonContainer = styled.div`
   ${tw`
        w-full flex items-center mr-22px
    `}
`

export const AddListButton = styled.button`
   ${tw`
        flex items-center border-none rounded-4px bg-transparent cursor-pointer focus:outline-none
    `}
`

export const AddListButtonText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        ml-4px
    `}
`

export const MoreIconContainer = styled.div`
   ${tw`
      cursor-pointer relative
   `}
`

export const ListMenuContainer = styled.div`
   ${tw`p-16px shadow-breadCrumbShadow bg-white flex flex-col min-w-228px rounded-16px border border-lightBlueGrey`}
`

export const ListMenuItem = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 py-12px px-16px cursor-pointer hover:text-brightBlue hover:bg-brightBlue10 rounded-8px mb-8px last:mb-0px`}
`
export const ListTitleArea = styled.div``

export const ListNameTextInputCss = css`
   ${tw`h-40px py-8px px-16px`}
`

export const nonEditableTextContainerCSS = css`
   ${tw`pointer-events-none`}
`

export const MoveListHeader = styled.div`
   ${tw`flex items-center justify-between w-full px-24px h-65px border-0 border-b border-solid border-lightBlueGrey`}
`

export const MoveListHeaderTitle = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`uppercase`}
`

export const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`

export const TitleText = styled(Typo12DarkBlueGreyHKGroteskSemiBold)``

export const nonEditableTextCSS = {
   width: 'auto',
   cursor: 'text',
   pointerEvents: 'auto'
}

export const nonEditableTextCSSWithDisabledActions = {
   width: 'auto',
   pointerEvents: 'none'
}
