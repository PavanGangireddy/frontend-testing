import tw, { styled, TwStyle } from 'twin.macro'

import { mobile, customDevice } from '../../../Common/utils/MixinUtils'

export const WorkbooksAndFoldersContainer = styled.div`
   ${({ isGridView, isListView }): TwStyle[] => [
      isGridView && tw`border-0`,
      isListView && tw`border-0 `
   ]}
   ${tw`
         w-inherit flex flex-col
    `}
`

export const GridViewContainer = styled.div`
   ${tw`
      flex flex-col
   `}
`

export const GridViewSection = styled.div`
   ${tw`
      flex flex-wrap mb-24px
   `}
   ${mobile} {
      ${tw`items-stretch justify-between`}
   }
   ${customDevice(539, 768)} {
      ${tw`justify-start`}
   }
`

export const ListViewContainer = styled.div`
   ${tw`
      w-inherit flex flex-col mb-47px
   `};
`
