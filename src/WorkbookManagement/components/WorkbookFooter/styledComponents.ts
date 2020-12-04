import tw, { css, styled, TwStyle } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14SteelHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular,
   Typo12DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'

export const FooterContainer = styled.div`
   ${tw`
        w-full flex items-center pl-8px border border-t border-lightBlueGrey
    `}
`

export const LeftSection = styled.div`
   ${tw`
         w-3/4 flex items-center py-4px
   `};
`

export const RightSection = styled.div`
   ${tw`
      flex px-16px py-12px border-0 border-l border-solid border-lightBlueGrey
   `}
`

export const AddIconContainer = styled.div`
   ${tw`
        pr-8px
    `}
`

export const ButtonWithIcon = styled.button`
   ${({ isDisabled }): TwStyle =>
      isDisabled
         ? tw`cursor-not-allowed pointer-events-auto`
         : tw`cursor-pointer pointer-events-auto`}
   ${tw`
      focus:outline-none border-none bg-transparent
   `}
`

export const LeftScrollButton = styled(ButtonWithIcon)`
   ${tw`
      mr-12px
   `}
`

export const DroppableContainer = styled.div`
   ${tw`
        flex items-center rounded bg-white overflow-x-auto
    `}
      ::-webkit-scrollbar {
      display: none;
   }
   scrollbar-width: none;
   -ms-overflow-style: none;
`

export const PageDetailsContainer = styled.div`
   ${tw`
      flex
   `}
`

export const PageButtonContainer = styled.div`
   ${({ isActive }): TwStyle =>
      isActive ? tw`bg-lightBlueGrey24` : tw`bg-white`}
   ${tw`
         flex items-center py-4px px-14px cursor-pointer rounded border border-solid border-lightBlueGrey
    `}
    ${({ isDisabled }): TwStyle =>
       isDisabled
          ? tw`cursor-not-allowed pointer-events-none`
          : tw`pointer-events-auto`}
`

export const ActivePageName = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
         mr-8px truncate
    `}
`

export const NormalPageName = styled(Typo14SteelHKGroteskSemiBold)`
   ${tw`
        min-w-42px mr-8px truncate
    `}
`

export const pageNameTextCSS = css`
   ${tw`border-0 bg-transparent flex items-center font-semibold min-w-42px px-0`}
`
export const pageNameTextInputCSS = css`
   ${tw`border-0 bg-transparent flex items-center font-semibold min-w-42px h-auto leading-normal pl-4px`}
`

export const ListMenuContainer = styled.div`
   ${tw`rounded-16px p-16px shadow-breadCrumbShadow border border-lightBlueGrey bg-white flex flex-col min-w-228px`}
`

export const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`leading-1.71 py-12px px-16px cursor-pointer hover:text-brightBlue hover:bg-brightBlue10 rounded-8px mb-8px last:mb-0px`}
`

export const MovePageHeader = styled.div`
   ${tw`
      flex items-center justify-between w-full px-24px h-65px border-0 border-b border-solid border-lightBlueGrey
   `}
`

export const MovePageTitle = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
      uppercase
   `}
`

export const CloseMovePageButton = styled.button`
   ${tw`
      focus:outline-none border-none bg-transparent
   `}
`
