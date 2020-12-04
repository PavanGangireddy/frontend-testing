import tw, { styled } from 'twin.macro'
import { mobile } from '../../../../Common/utils/MixinUtils'

export const MenuWrapper = styled.div`
   ${tw`min-w-228px p-16px bg-white flex flex-col shadow-breadCrumbShadow rounded-16px border border-lightBlueGrey`}
   ${mobile} {
      ${tw`shadow-none border-0 p-0px py-8px`}
   }
`
