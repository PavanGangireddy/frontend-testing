import styled from '@emotion/styled'
import tw from 'twin.macro'

export const FileInput = styled.input`
   ${tw`flex items-center justify-center`};
   width: 300px;
   height: 80px;
   border-style: dashed;
   border-color: lightgray;
   outline: none;
   border-width: 1px;
   border-radius: 3px;
   text-align: center;

   &:hover {
      border-color: gray;
   }
`
