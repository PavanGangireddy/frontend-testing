import tw, { styled, css, TwStyle } from 'twin.macro'

import Button from '../../../Common/components/Button'
import {
   Typo14WhiteHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo24BlueThreeHKGroteskRegular,
   Typo36DarkBlueGreyDMSherifDisplay
} from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const UserWorkbooksAndFoldersContainer = styled.div`
   ${({ shouldAddMobilePadding }): TwStyle =>
      shouldAddMobilePadding ? tw`px-16px` : tw`px-0`}
   ${tw`
        flex flex-col bg-whiteTwo 
    `}

   background-position-x: center;
   background-repeat: no-repeat;
   ${props =>
      props.isEmptyTrash
         ? {
              backgroundImage: `url(https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/3f92611b-9f4f-4d44-ac01-439d837f1be2.svg)`,
              alignItems: 'center',
              height: '100%',
              backgroundPositionY: 'bottom',
              position: `relative`,
              bottom: `15%`,
              padding: '20% 0% 0px'
           }
         : tw`md:p-32px pt-0 md:pt-0`}

   ${mobile} {
      ${tw`mx-16px my-8px p-0px`};
      ${({ isEmptyTrash }) =>
         isEmptyTrash
            ? {
                 backgroundSize: '40%',
                 alignItems: 'flex-start',
                 margin: 0,
                 padding: '27% 24px 0',
                 backgroundPositionY: 'center'
              }
            : null};
   }
`

export const WorkbooksAndFoldersContainer = styled.div`
   ${tw`
        w-full
    `}
`

export const ModalBodyContainer = styled.form`
   ${tw`flex flex-col bg-white border-default border-solid border-lightBlueGrey shadow-steel16 rounded-4px p-24px relative min-w-323px`}
   ${mobile} {
      ${tw`shadow-none border-0 p-0px min-w-0`}
   }
`
export const StyledIconContainer = styled.div`
   ${tw`flex items-center justify-center w-16px h-16px cursor-pointer absolute top-24px right-24px`}
`

export const ModalHeading = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.33 capitalize`}
`

export const BaseInputContainer = styled.div`
   ${tw`mt-10px min-h-77px`}
   ${mobile} {
      ${tw`w-full mt-16px min-h-0`}
   }
`

export const FooterMainContainer = styled.div`
   ${tw`flex justify-end mt-8px`}
   ${mobile} {
      ${tw`my-24px`}
   }
`

export const CreateButton = styled(Button)``

export const CreateButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-1.71`}
`

export const CancelButton = styled(Button)`
   ${tw`mr-16px`}
`
export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.71`}
`

export const NoDataContainer = styled(Typo24BlueThreeHKGroteskRegular)`
   min-height: calc(100vh - 80px);
   ${tw`flex items-center justify-center`}
`

export const loaderContainerClassName = css`
   ${tw`bg-whiteTwo flex items-start flex-wrap justify-start flex-grow-0 ml-32px mt-24px`};
   ${mobile} {
      ${tw` ml-24px mt-8px`}
   }
   height: fit-content;
`

export const DrawerHeading = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.33 flex items-center capitalize`}
`
export const InputCSS = css`
   ${tw`mt-0px`}
`

export const EmptyTrash = styled(Typo36DarkBlueGreyDMSherifDisplay)`
   ${mobile} {
      ${tw`text-24px`};
   }
`
