import tw, { css, styled, TwStyle } from 'twin.macro'

import {
   Typo32DarkBlueGreyHKGroteskMedium,
   Typo20SteelHKGroteskMedium,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14SteelHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import { tablet, customDevice, mobile } from '../../../Common/utils/MixinUtils'
import Button from '../../../Common/components/Button'
import TextInput from '../../../Common/components/TextInput'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import Colors from '../../../Common/themes/Colors'

export const CardDetailsContainer = styled.div`
   ${tw`flex flex-col`}
`

export const HeaderActions = styled.div`
   ${tw`flex justify-center items-center  mt-20px self-start`}
`

export const Header = styled.div`
   ${tw`flex w-full flex-1 min-h-75px items-center px-4 border-b-2 border-solid border-paleGrey top-0 sticky rounded-tl-lg rounded-tr-lg`}
   background:${({ cardLabelBackground }): string =>
      cardLabelBackground ? cardLabelBackground : Colors.white};
   color: ${(props): string =>
      props.cardLabelTextColor ? props.cardLabelTextColor : Colors.darkBlueGrey}
`

export const PopOverMenuContainer = styled.div`
   ${tw`flex justify-center w-12`};
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`pointer-events-none` : tw`cursor-pointer`}
`

export const ListMenuContainer = styled.div`
   ${tw`bg-white rounded-16px p-16px shadow-breadCrumbShadow border border-lightBlueGrey`};
`

export const ListMenuItem = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`flex items-center leading-3 py-12px px-16px cursor-pointer hover:text-brightBlue hover:bg-brightBlue10 rounded-8px mb-8px last:mb-0px`}
`

export const Children = styled.div`
   ${tw`overflow-hidden`}
`

export const ModalCloseIcon = styled(BlackCloseIcon)`
   ${tw`cursor-pointer`}
`

export const CardTitle = styled.div``

export const TitleTypo = styled(Typo32DarkBlueGreyHKGroteskMedium)`
   ${tw`select-none text-18px md:text-32px max-w-817px`}
   ${customDevice(320, 359)} {
      ${tw`text-14px`}
   }
   ${customDevice(360, 380)} {
      ${tw`text-16px`}
   }
   word-break: break-word;
`

export const TitleStyles = css`
   ${tw`px-0 w-full text-18px md:text-2xl `};
   ${customDevice(320, 350)} {
      ${tw`text-16px`}
   }
`

export const AddAttachmentButton = styled(Button)`
   ${tw`flex items-center justify-start px-0 w-48 bg-white`}
`
export const AddAttachmentsContainer = styled.div`
   ${tw`flex flex-col justify-center my-2 w-full  md:w-600px`}
   ${tablet} {
      ${tw`w-450px`}
   }
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const InputFieldContainer = styled.div`
   ${tw`flex w-585px self-center`}
   ${({ isAddingAttachment }) => (isAddingAttachment ? tw`flex` : tw`hidden`)}
   ${tablet}{
      ${tw`w-450px`}
   }
`

export const InputBox = styled(TextInput)`
   ${tw`w-full px-2 h-40px flex items-center`}
`

export const AddAttachmentDrawerContainer = styled.div`
   ${tw`flex flex-col`}
`

export const ButtonText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`px-1`}
`

export const SubContainer = styled.div`
   ${tw`flex  flex-col p-16px md:p-0 mt-8px md:mt-4 border-0 border-t border-b border-solid border-lightBlueGrey md:border-0`}
   .ql-container {
      ${tw`font-hkGrotesk`}
   }
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const NotesContainer = styled(SubContainer)`
   ${tw`mt-0 md:my-0px md:mt-24px pointer-events-auto`}
`

//TODO: need to update margin top based on height of navbar
export const CardDetailsBody = styled.div`
   ${tw`flex flex-col md:px-8 bg-white w-full min-h-full md:min-h-750px mt-65px md:mt-0`};
   ${mobile} {
      ${tw`overflow-y-auto`}
   }
`

export const SubHeader = styled.div`
   ${tw`flex items-center`}
`

export const SubTitle = styled(Typo20SteelHKGroteskMedium)`
   ${tw`pr-8px`}
`

export const NotesActionsContainer = styled.div`
   ${tw`hidden w-10 justify-between items-center self-end -mt-6 mx-4`}
   ${({ isNotesEditable }) => isNotesEditable && tw`flex`}
`

export const NotesAction = styled.div`
   ${tw`cursor-pointer`}
`

export const NotesBody = styled.div``

export const NotesText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`hidden select-none`}
   ${({ isNotesEditable }) => !isNotesEditable && tw`flex`}
`

export const AttachmentList = styled.ul`
   ${tw`flex w-full md:w-600px flex-col`}
   ${tablet} {
      ${tw`w-450px`}
   }
`

export const NotesEditor = styled.div`
   ${tw`flex m-0 flex-1 w-full h-24`}
`

export const ButtonsContainer = styled.div`
   ${tw`flex justify-end mt-16px`}
`

export const SaveButton = styled(Button)`
   ${tw`w-80px mt-8px h-32px flex items-center justify-center py-0`}
`

export const SaveButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const EditableTextEditorContainer = styled.div`
   ${tw`flex flex-1 md:px-16px py-10px cursor-text select-none rounded-4px max-h-398px overflow-auto`}
   ${({ shouldDisableActions }): TwStyle =>
      shouldDisableActions ? tw`` : tw`hover:bg-steel16`}
`

export const EditableTextStyle = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`w-full h-full leading-1.71`}
   overflow-wrap: break-word;
   a {
      ${tw`underline text-blue`}
   }
   ol {
      ${tw`list-decimal ml-8`}
   }
   ul {
      ${tw`list-disc ml-8`}
   }
`

export const NonEditableTextContainerStyles = css`
   ${tw`
      px-0 md:px-16px
   `}
`

export const AddNotesButton = styled(Button)`
   ${tw`flex items-center justify-start px-0 w-32 mt-8px bg-white`};
`

export const CancelButton = styled(Button)`
   ${tw` w-maxContent mr-10px mt-8px h-32px flex items-center py-0`}
`
export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw``}
`

export const TabsContainer = styled.div`
   ${tw`
      mt-24px
   `}
`

export const ChecklistContainer = styled.div`
   ${tw`
      flex items-center justify-center mt-16px mb-32px
   `}
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const QuillDrawerWrapper = styled.div`
   ${tw`flex flex-col py-16px`}
`

export const DrawerHeaderTitleText = styled(
   Typo14DarkBlueGreyHKGroteskSemiBold
)``

export const EmptyMessageText = styled(Typo14SteelHKGroteskRegular)``

export const EmptyNotesText = styled(EmptyMessageText)`
   ${tw`
      mt-8px
   `}
`
