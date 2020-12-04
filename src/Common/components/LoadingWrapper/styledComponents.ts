import tw, { styled } from 'twin.macro'

export const Container = styled.div`
   ${tw`h-screen flex justify-center items-center`}
   ${props => props.className}
`
