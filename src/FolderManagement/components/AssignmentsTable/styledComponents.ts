import tw, { styled } from 'twin.macro'
import { mobile } from '../../../Common/utils/MixinUtils'

export const AssignmentTableContainer = styled.div`
   ${tw`
        border-none md:border md:border-solid md:border-lightBlueGrey md:rounded-12px bg-white
        md:mt-24px
    `}
   ${mobile} {
      ${tw`bg-transparent`}
   }
`

export const TableHederContainer = styled.div`
   ${tw`
        w-full flex pl-35px pr-24px py-24px
    `}
`

export const RowContainer = styled.div`
   ${tw`
        mt-24px md:p-24px md:mt-0 flex border border-solid border-transparent md:hover:border-brightBlue
        md:hover:bg-paleGreySix cursor-pointer
    `}
   ${mobile} {
      ${tw`mt-0`}
   }
`

export const RowWithDivider = styled.div`
   ${mobile} {
      ${tw` bg-white border border-solid border-lightBlueGrey rounded mt-2 p-2`}
   }
`
export const RowContainerSkeleton = styled(RowContainer)`
   ${tw`w-full border border-solid border-lightBlueGrey rounded flex justify-between items-center border border-solid border-default hover:border-default mx-12px hover:bg-transparent m-0`};
   max-height: 82px;
`
