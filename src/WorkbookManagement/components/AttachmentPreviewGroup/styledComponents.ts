import tw, { styled } from 'twin.macro'

export const AttachmentsContainer = styled.div`
   ${tw`w-full flex overflow-x-auto overflow-y-hidden`};
   ::-webkit-scrollbar {
      display: none;
   }
   -ms-overflow-style: none;
   scrollbar-width: none;
`
