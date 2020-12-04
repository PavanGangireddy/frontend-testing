import tw, { styled, TwStyle } from 'twin.macro'

import Button from '../Button'
import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../styleGuide/Typos'
import { customDevice } from '../../utils/MixinUtils'

export const ResourcesListContainer = styled.div`
   ${tw`flex flex-1 flex-col`}
`

export const ResourceContainer = styled.div`
   ${tw`flex w-504px items-center py-8px border-0 border-b border-solid border-lightBlueGrey`}
   ${customDevice(320, 767)} {
      ${tw`
         w-auto
      `}
   }
`

export const ResourceIconContainer = styled.div`
   ${tw`mr-24px ml-10px`}
`

export const GoBackButton = styled.div`
   ${tw`w-20px h-20px p-0 cursor-pointer`};
`

export const ResourceName = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`select-none`}
`

export const WorkbookAndFoldersList = styled.ul`
   ${tw`m-0 list-none p-0 h-357px overflow-y-auto`}
   ${customDevice(320, 767)} {
      ${tw`
         flex-grow
      `}
      max-height: 63vh;
   }
`

export const ListItem = styled.li`
   ${({ isDisabled }): TwStyle =>
      isDisabled
         ? tw`cursor-not-allowed opacity-75`
         : tw`cursor-pointer opacity-100`}
   ${tw`flex items-center w-504px h-40px my-2px hover:bg-lightBlueGrey50 border-0 border-b border-solid border-lightBlueGrey`}
   ${customDevice(320, 767)} {
      ${tw`
         w-auto
      `}
   }
`

export const MoveFolderChildFooter = styled.div`
   ${tw`flex items-center justify-end`}
   ${customDevice(320, 767)} {
      ${tw`
         z-150 bg-white shadow-moveBottomSectionShadow fixed bottom-0 left-0 w-full px-24px py-12px
      `}
   }
`

export const CancelButton = styled(Button)`
   ${tw`bg-white mx-12px rounded-4px border border-solid border-lightBlueGrey`}
`

export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const SuccessButton = styled(Button)`
   ${tw`w-108px h-40px mx-12px`}
`
