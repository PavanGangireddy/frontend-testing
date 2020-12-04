import tw, { styled } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular
} from '../../../../Common/styleGuide/Typos'
import Image from '../../../../Common/components/Image'
import { minDeviceWidth, mobile } from '../../../../Common/utils/MixinUtils'

export const WorkbookListItemContainer = styled.div`
   ${tw`
   flex py-5 px-8 justify-between
       border border-solid border-white bg-white hover:border hover:bg-paleGrey hover:border-blueTwo cursor-pointer py-4
       border-lightBlueGrey
       
    `}
   border-top-color:transparent; //TODO:need to update with tailwind styles
`

export const NameLabel = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`ml-32px select-none truncate whitespace-normal`}
`

export const DateLabel = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
      self-center
   `}
`

export const ListMenuContainer = styled.div`
   ${minDeviceWidth(1199)} {
      ${WorkbookListItemContainer}:hover & {
         ${tw`block`}
      }
      ${tw`
        hidden
    `}
   }
`

export const OwnerImage = styled(Image)`
   ${tw`h-32px object-contain`}
`

export const ContainerCSS = styled.div`
   ${mobile} {
      transform: rotate(90deg);
   }
`
