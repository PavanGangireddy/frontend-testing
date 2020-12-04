import * as React from 'react'

interface Props {
   width: number
   height: number
}

const TopicArrow = (props: Props) => (
   <svg width={12} height={12} fill='none' viewBox='0 0 12 12' {...props}>
      <path
         fill='#616E7C'
         fillRule='evenodd'
         d='M5 9.5a.5.5 0 01-.384-.82l2.238-2.685-2.158-2.681a.5.5 0 11.78-.627l2.414 3a.499.499 0 01-.006.633l-2.5 3A.496.496 0 015 9.5'
         clipRule='evenodd'
      />
   </svg>
)

TopicArrow.defaultProps = {
   width: 30,
   height: 30
}
export default TopicArrow
