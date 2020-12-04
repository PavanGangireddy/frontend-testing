import tw, { styled } from 'twin.macro'

import {
   Typo16DarkBlueGreyHKGroteskBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../styleGuide/Typos'
import { mobile } from '../../utils/MixinUtils'

export const BreadCrumbItemText = styled(Typo16DarkBlueGreyHKGroteskBold)`
   ${tw`rounded mx-1 hover:cursor-pointer border border-solid border-transparent hover:border-blueTwo hover:bg-paleGreySix
   px-8px`}
   ${mobile} {
      ${tw`text-14px`}
   }
`

export const BreadCrumbsList = styled.ul`
   ${tw`flex list-none `}
`

export const BreadCrumbItem = styled.li`
   ${tw`flex items-center`};
`

export const Separator = styled.span`
   ${tw`p-1`}
`
export const ListMenuContainer = styled.div`
   ${tw`min-w-228px p-16px bg-white flex flex-col rounded-16px shadow-breadCrumbShadow mt-6px
      border border-solid border-lightBlueGrey
   `}
   ${mobile} {
      ${tw`shadow-none p-0px m-0px border-none`}
   }
`

export const ListMenuItem = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 py-8px px-16px cursor-pointer hover:text-blueTwo hover:bg-brightBlue10 flex rounded-8px`}
`
export const MenuContainer = styled.div`
   ${tw`flex justify-center items-center
   rounded ml-1 mr-2 hover:cursor-pointer border border-solid border-transparent hover:border-blueTwo hover:bg-paleGreySix`}
`
export const IconWrapper = styled.div`
   ${tw`mr-8px`}
   ${tw`mr-16px`}
`

export const MenuItemName = styled.div``

export const Container = styled.div`
   ${tw`flex items-center`};
`

export const MoreIconContainer = styled.div``
