import tw, { styled } from 'twin.macro'

import {
   Typo16WhiteHKGroteskMedium,
   Typo14WhiteHKGroteskSemiBold,
   Typo12SteelHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'
import { customDevice } from '../../../Common/utils/MixinUtils'

export const SharedPeopleContainer = styled.div`
   ${tw`w-full flex flex-col`}
`
export const SharedPeopleHeader = styled.div`
   ${tw`w-full flex flex-col`}
`
export const TitleContainer = styled.div`
   ${tw`flex mt-4px items-center`}
`

export const SharedPeopleTitle = styled(Typo16WhiteHKGroteskMedium)`
   ${tw`flex items-center ml-8px`}
`

export const UsersList = styled.ul``

export const UserItemContainer = styled.li`
   ${tw`flex my-16px`}
`

export const UserItemBody = styled.div`
   ${tw`flex flex-col ml-8px`}
`
export const Username = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`lg:max-w-202px truncate`}
   ${customDevice(768, 1024)} {
      ${tw`max-w-80px`}
   }
`

export const PermissionLevel = styled(Typo12SteelHKGroteskRegular)`
   ${tw`text-steel capitalize`};
`

export const Footer = styled.div`
   ${tw`flex items-center justify-center mt-32px`}
`

export const ShareWorkbookButton = styled(Button)`
   ${tw` rounded flex justify-center items-center`}
   ${customDevice(768, 1024)} {
      ${tw`px-12px`}
   }
`

export const ButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${customDevice(768, 1024)} {
      ${tw`text-12px`}
   }
`
