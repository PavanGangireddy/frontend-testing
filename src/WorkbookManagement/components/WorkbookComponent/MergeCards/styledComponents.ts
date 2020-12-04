import tw, { styled, TwStyle, css } from 'twin.macro'

import {
   Typo24DarkBlueGreyHKGroteskMedium,
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo18SteelHKGroteskMedium,
   Typo14Steel40HKGroteskSemiBold,
   Typo14SteelHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold
} from '../../../../Common/styleGuide/Typos'
import TextArea from '../../../../Common/components/TextArea'
import Button from '../../../../Common/components/Button'
import TextInput from '../../../../Common/components/TextInput'
import { tablet, mobile } from '../../../../Common/utils/MixinUtils'

export const MergeCardsContainer = styled.div`
   ${tw`
        w-full h-full flex flex-col bg-whiteTwo px-16px overflow-auto
    `}
`

export const CloseMergeCardsButton = styled.button`
   ${tw`
        bg-transparent focus:outline-none border-none cursor-pointer
    `}
`

export const SectionTitleAndIconContainer = styled.div`
   ${tw`
        flex items-center self-start pb-8px
    `}
`

export const TitleIconContainer = styled.div`
   ${tw`
        ml-8px
    `}
`

export const SectionTitleLabel = styled(Typo18SteelHKGroteskMedium)`
   ${tw`
        self-start capitalize sm:block lg:inline-block
    `}
   ${mobile} {
      ${tw`text-12px`}
   }
`

export const UndoRedoIconContainer = styled.button`
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer`}
   ${tw`
        absolute border-none focus:outline-none
    `}
`

export const LeftIconContainer = styled(UndoRedoIconContainer)`
   ${props =>
      props.isMobileDevice
         ? tw`right-47% -bottom-13px origin-center transform rotate-90`
         : tw`-right-13px top-50%`};
`

export const RightIconContainer = styled(UndoRedoIconContainer)`
   ${props =>
      props.isMobileDevice
         ? tw`right-47% -top-13px origin-center transform rotate-90`
         : tw`-left-13px top-50%`};
`

export const InputFieldWithClearButton = styled.div`
   ${tw`
        relative m-0 p-0 h-full
    `}
`

export const InputClearButton = styled.button`
   ${tw`
        focus:outline-none absolute right-8px bottom-16px
    `}
`

export const MergeCardsHeader = styled.div`
   ${tw`
        my-24px flex justify-between items-center
    `}
`

export const MergeCardsTitle = styled(Typo24DarkBlueGreyHKGroteskMedium)`
   ${tw`
        capitalize
    `}
`

export const MergeCardsWrapper = styled.div`
   ${tw`
        w-full border border-solid border-lightBlueGrey bg-lightBlueGrey24 rounded-6px mb-24px
    `}
`

export const SectionWrapper = styled.div`
   ${tw`
        flex items-center relative
    `}
`

export const CardsWrapper = styled(SectionWrapper)`
   ${tw`
        h-64px bg-lightBlueGrey24
    `}
`

export const LeftAndRightSection = styled.div`
   ${tw`
        min-w-214px w-2/6 flex
    `}
`

export const MiddleSection = styled.div`
   ${tw`
        w-4/6 h-full flex border-l border-r border-solid border-lightBlueGrey
    `}
`

export const LeftAndRightCardSection = styled(LeftAndRightSection)`
   ${tw`
        h-full p-12px items-center relative
    `}
`

export const CardSection = styled.div`
   ${tw`
        w-full cursor-pointer flex items-center justify-start
    `}
`

export const CardsDropDownIcon = styled.div`
   ${tw`
        ml-24px mr-12px
    `};
   ${mobile} {
      ${tw`mx-8px`}
   }
`

export const MiddleCardSection = styled(MiddleSection)`
   ${tw`
        h-full justify-center items-center
    `}
`

export const MergedCardTitle = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${tw`

    `}
`

export const TitlesWrapper = styled(SectionWrapper)`
   ${tw`
        h-176px bg-lightBlueGrey40
    `}
`

export const LeftAndRightTitleSection = styled(LeftAndRightCardSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const MiddleTitleSection = styled(MiddleSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const TitleInputField = styled(TextArea)`
   ${tw`
        h-96px text-20px border border-solid border-steel bg-white rounded-4px
        py-12px px-16px
    `}
   ${tablet} {
      ${tw`text-18px`}
   }
   ${mobile} {
      ${tw`text-14px mt-2`}
   }
`

export const NotesWrapper = styled(SectionWrapper)`
   ${tw`
        items-stretch bg-lightBlueGrey24
    `}
`

export const NotesLeftIconContainer = styled(LeftIconContainer)``

export const NotesRightIconContainer = styled(RightIconContainer)``

//TODO: Need to update these styles with tw and need to check calc in tailwind
export const NotesEditorContainer = styled.div`
   ${props => (props.isMobileDevice ? tw`h-200px` : tw`h-full`)}
   ${tw`h-full`}
   .quill {
      height: calc(100% - 25px);
   }
   .ql-editor {
      ${tw`max-h-398px h-full min-h-77px`}
   }
   .ql-toolbar.ql-snow {
      ${tw`p-0 pl-8px`}
   }
   .ql-container.ql-snow {
      ${tw`min-h-77px h-full`}
   }
   ${mobile} {
      .quill {
         height: calc(100% - 50px);
      }
   }
`

export const LeftAndRightNotesSection = styled(LeftAndRightCardSection)`
   ${tw`
        h-inherit p-24px flex-col
    `}
`

export const MiddleNotesSection = styled(MiddleSection)`
   ${tw`
        p-24px flex-col h-auto
    `}
`

export const NotesContainer = styled.div`
   ${tw`
    flex w-full h-full text-14px  bg-white rounded-4px
    py-12px px-16px overflow-auto
    `}
   ${mobile} {
      ${tw`my-16px`}
   }
`

export const EditableTextStyle = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 max-h-398px`}
   a {
      ${tw`underline text-blue`}
   }
   ol {
      ${tw`list-decimal`}
   }
   ul {
      ${tw`list-disc`}
   }
`

export const AttachmentsWrapper = styled(SectionWrapper)`
   ${tw`
        bg-lightBlueGrey40
    `}
`

export const AttachmentsContainer = styled.div`
   ${tw`
        w-full
    `}
   ${mobile} {
      ${tw`flex overflow-x-auto overflow-y-hidden`};
      ::-webkit-scrollbar {
         display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
   }
`

export const LeftAndRightAttachmentsSection = styled(LeftAndRightCardSection)`
   ${tw`
       h-auto p-24px flex-col self-stretch
    `}
`

export const MiddleAttachmentsSection = styled(MiddleSection)`
   ${tw`
        h-auto p-24px flex-col self-stretch
    `}
`

export const LabelsWrapper = styled(SectionWrapper)`
   ${tw`
        bg-lightBlueGrey24
    `}
`

export const LeftAndRightLabelsSection = styled(LeftAndRightCardSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const MiddleLabelsSection = styled(MiddleSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const ColorPalletteContainer = styled.div`
   ${tw`
        self-start my-6
    `}
   ${mobile} {
      ${tw`my-24px`}
   }
`

export const PriorityWrapper = styled(SectionWrapper)`
   ${tw`
        bg-lightBlueGrey40
    `}
`

export const LeftAndRightPrioritySection = styled(LeftAndRightCardSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const MiddlePrioritySection = styled(MiddleSection)`
   ${tw`
        p-24px flex-col
    `}
`

export const PriorityGroupContainer = styled.div`
   ${tw`
        self-start mt-8px
    `}
`
export const NextButtonContainer = styled.div`
   ${tw`
        w-full flex justify-center my-32px
    `}
`

export const NextButton = styled(Button)`
   ${tw`
        py-8px px-20px text-black
    `}
   ${({ isDisabled }): TwStyle =>
      !isDisabled ? tw`border-brightBlue bg-transparent text-black` : tw``}
`

export const NextButtonDisabledText = styled(Typo14Steel40HKGroteskSemiBold)``

export const NextButtonActiveText = styled(
   Typo14DarkBlueGreyHKGroteskSemiBold
)``

export const AddAttachmentButton = styled(Button)`
   ${tw`
        self-start bg-transparent flex items-center border-none px-0
    `}
`
export const AddAttachmentsContainer = styled.div`
   ${tw`
        flex flex-col justify-center
    `}
`
export const AddAttachmentsOverLayContainer = styled.div`
   ${tw`
    flex flex-col
    `}
`
export const AddAttachmentHeaderTitle = styled.div`
   ${tw`
        ml-8px
    `}
`
export const AttachButton = styled(Button)`
   ${tw` h-40px `}
`
export const AddAttachmentButtonsContainer = styled.div`
   ${tw`self-end mt-2`}
   width:82px;
`

export const AttachButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const AddAttachmentsHeaderContainer = styled.div`
   ${tw`
        flex items-center
    `}
`
export const InputFieldWithCloseButton = styled.div`
   ${tw`
        flex items-center
    `}
`

export const CloseButton = styled.button`
   ${tw`
        border-none focus:outline-none ml-4px mt-4px
    `}
`

export const InputFieldContainer = styled.div`
   ${tw`
        flex-grow
   `}
`

export const InputBox = styled(TextInput)`
   ${tw`
        w-full px-2 h-40px flex items-center
    `}
`

export const ButtonText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        ml-4px
    `}
`
export const TopBottomCardSection = styled.div`
   ${tw`
    w-full flex flex-col justify-center relative
    `}
`

/***************** mobile only styles *****************/
export const MobileMiddleSection = styled.div`
   background: #f2f4f7;
   ${tw`
        w-full flex flex-col relative border border-solid border-lightBlueGrey px-4 pb-2 my-4 flex-grow flex-shrink-0
    `}
`
export const MobileLayout = styled.div`
   ${tw`
        w-screen h-screen flex flex-col bg-whiteTwo box-border
    `}
`
export const tabListContainerCSS = css`
   min-height: 20px;
   margin-top: 12px;
   margin-bottom: 12px;
   overflow: auto;
   border: none;
   display: flex;
   justify-content: space-between;
   flex-grow: 1;
   ::-webkit-scrollbar {
      display: none;
   }
   -ms-overflow-style: none;
   scrollbar-width: none;
`

export const tabContainerCSS = css`
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   text-transform: capitalize;
   margin-left: 16px;
   margin-right: 16px;
`

export const itemCSS = css`
   text-transform: capitalize;
`

export const MobileMergeCardsContainer = styled.div`
   height: calc(100vh - 104px);
   ${tw`
      overflow-auto flex flex-col
    `};
`
export const MobileTopAndBottomSection = styled.div`
   background: #f2f4f7;
   min-height: 100px;
   ${tw`
        mx-0 border border-solid border-lightBlueGrey p-4 relative flex flex-col justify-around flex-grow flex-shrink-0
    `}
`

export const MobileContentTitleAndContent = styled.div`
   ${tw`
        my-6 flex flex-col
    `}
`
export const TabBarContainer = styled.div`
   ${tw`
        px-4
    `}
`
export const MobileMergedCardTitle = styled(
   Typo14DarkBlueGreyHKGroteskSemiBold
)`
   ${tw`
      my-2
   `}
`
