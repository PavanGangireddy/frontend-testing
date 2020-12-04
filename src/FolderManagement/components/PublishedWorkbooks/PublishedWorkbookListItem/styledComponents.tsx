import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../../../Common/styleGuide/Typos'

export const PublishedWorkbookListItemContainer = styled.div`
   ${tw`
   flex py-5 px-8 justify-between
       border border-solid border-white bg-white hover:border hover:bg-paleGrey hover:border-blueTwo cursor-pointer py-4
       border-lightBlueGrey
       
    `}
   /* TODO:need to update with tailwind styles  */
   border-top-color:transparent;
`

export const NameLabel = styled(Typo14SteelHKGroteskRegular)`
   ${tw` select-none truncate whitespace-normal`}
`

export const DateLabel = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
      self-center
   `}
`
