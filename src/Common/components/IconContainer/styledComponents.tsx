import tw, { styled } from 'twin.macro'

export const Container = styled.div`
   ${tw`min-w-24px min-h-24px flex justify-center items-center`}
   ${props => props.css}
`
