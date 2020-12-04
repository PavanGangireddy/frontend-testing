import tw, { styled } from 'twin.macro'

import TextInput from '../../../../Common/components/TextInput'

export const InputBox = styled(TextInput)`
   ${tw`flex w-400px h-32px pl-1 `}
`

export const InputWrapper = styled.div`
   ${tw`px-16px flex items-start h-50px`}
`

export const AddCheckListWrapper = styled.div`
   ${tw`mb-16px flex items-center w-full relative -mt-8px`};
`

export const CheckBoxContainer = styled.div`
   ${tw`flex`}
`
