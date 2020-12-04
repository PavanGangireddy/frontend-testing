import tw, { styled } from 'twin.macro'

import {
   Typo14SteelHKGroteskRegular,
   Typo24BlueThreeHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Card from '../../../Common/components/Card'
import Image from '../../../Common/components/Image'
import { mobile } from '../../../Common/utils/MixinUtils'

export const NoDataViewContainer = styled.div`
   ${tw`
        w-full flex items-center justify-start bg-whiteTwo md:justify-center
    `}
   ${mobile} {
      ${tw`items-start justify-center`}
   }
   min-height: calc(100vh - 150px);
`

export const MessageAndCardsContainer = styled.div`
   ${tw`
      flex flex-col items-center justify-center
   `}
`

export const NoDataMessage = styled(Typo24BlueThreeHKGroteskRegular)`
   ${tw`
        text-center m-8px md:m-0px
    `}
   ${mobile} {
      ${tw`mt-16px`}
   }
`

export const Break = styled.br``

export const CardsContainer = styled.div`
   ${tw`
        flex mt-28px
    `}
`

export const CardContainer = styled(Card)`
   ${tw`
        flex flex-col items-center justify-center shadow-sm border border-dashed border-steel40
        rounded-4px bg-white mx-12px cursor-pointer w-180px h-180px box-border
    `}
   ${mobile} {
      ${tw`p-11px w-43.3 h-112px `}
   }
`

export const AddButton = styled.button`
   ${tw`
        flex items-center focus:outline-none cursor-pointer bg-transparent border-none mt-12px
    `}
`

export const AddButtonText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        ml-4px
    `}
`

export const NoDataViewImage = styled(Image)`
   ${tw`
      w-450px
   `}
`
export const NodataHeading = styled.span``
