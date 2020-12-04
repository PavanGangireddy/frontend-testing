import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 48 48'
         {...props}
      >
         <path
            fill='#FF9102'
            d='M43.188 8.79H5.745a1.906 1.906 0 00-1.905 1.904V45.05c0 1.051.854 1.905 1.905 1.905H43.19a1.906 1.906 0 001.905-1.905V10.694a1.907 1.907 0 00-1.906-1.905z'
         />
         <path
            fill='url(#IDMFolderIcon__paint0_linear)'
            d='M40.724 35.015H8.21a1.905 1.905 0 01-1.905-1.905V2.756c0-1.052.853-1.905 1.905-1.905h32.513c1.053 0 1.906.853 1.906 1.905V33.11a1.905 1.905 0 01-1.905 1.905z'
         />
         <path
            fill='url(#IDMFolderIcon__paint1_linear)'
            fillRule='evenodd'
            d='M19.3 18.067l5.092-3.618-2.95 2.845c.07.21.105.421.14.667h4.285c.386-3.196 3.547-3.406 3.547-7.375 0-1.475-.562-2.81-1.44-3.793L24.778 10.2h2.67c-2.74 2.599-5.48 5.198-8.149 7.867z'
            clipRule='evenodd'
         />
         <path
            fill='url(#IDMFolderIcon__paint2_linear)'
            fillRule='evenodd'
            d='M26.218 3l-6.216 8.218 2.95-.035-2.459 4.355C19.44 14.203 18 13.255 18 10.621a5.742 5.742 0 015.268-5.725l-3.02 3.513L26.218 3z'
            clipRule='evenodd'
         />
         <path
            fill='#183B56'
            fillRule='evenodd'
            d='M21.688 18.558h4.074a.39.39 0 01.386.386.39.39 0 01-.386.387h-4.074a.39.39 0 01-.387-.387.39.39 0 01.387-.386zm-.14 1.475c0 .21.175.386.386.386h3.547a.39.39 0 00.386-.386.39.39 0 00-.386-.386h-3.548a.39.39 0 00-.386.386zm.561.738c.07.667.773 1.229 1.616 1.229.842 0 1.51-.527 1.615-1.23h-3.23z'
            clipRule='evenodd'
         />
         <path
            fill='url(#IDMFolderIcon__paint3_linear)'
            d='M6.908 33.714V3.359c0-1.052.853-1.905 1.906-1.905h32.513c.371 0 .717.108 1.01.292a1.905 1.905 0 00-1.614-.895H8.21a1.905 1.905 0 00-1.905 1.905V33.11a1.9 1.9 0 00.895 1.613 1.888 1.888 0 01-.292-1.01z'
         />
         <path
            fill='url(#IDMFolderIcon__paint4_linear)'
            d='M15.132 18.76l6.16 6.159h-6.16v-6.16z'
         />
         <path
            fill='url(#IDMFolderIcon__paint5_linear)'
            d='M45.093 25.427V11.254L42.629 8.79v16.638h2.465z'
         />
         <path
            fill='url(#IDMFolderIcon__paint6_linear)'
            d='M47.98 26.709L45.326 45.51a1.905 1.905 0 01-1.886 1.639H5.495c-.95 0-1.754-.7-1.887-1.639L.02 20.105a1.904 1.904 0 011.886-2.171h11.718c.95 0 1.754.698 1.887 1.638l.47 3.327c.133.94.937 1.638 1.886 1.638h28.229a1.905 1.905 0 011.886 2.172z'
         />
         <path
            fill='url(#IDMFolderIcon__paint7_linear)'
            d='M38.57 38.762H10.364a.635.635 0 01-.63-.555l-.353-2.794a.635.635 0 01.63-.715h28.913c.383 0 .678.336.63.715l-.352 2.794a.635.635 0 01-.63.555z'
         />
         <defs>
            <linearGradient
               id='IDMFolderIcon__paint0_linear'
               x1={10.041}
               x2={47.905}
               y1={3.506}
               y2={41.369}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#fff' />
               <stop offset={1} stopColor='#E8EFEE' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint1_linear'
               x1={19.299}
               x2={29.414}
               y1={12.43}
               y2={12.43}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint2_linear'
               x1={18}
               x2={26.218}
               y1={9.269}
               y2={9.269}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint3_linear'
               x1={25.584}
               x2={1.491}
               y1={19.049}
               y2={-5.044}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#fff' />
               <stop offset={1} stopColor='#E8EFEE' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint4_linear'
               x1={19.201}
               x2={11.756}
               y1={25.907}
               y2={18.462}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#C2CECE' stopOpacity={0} />
               <stop offset={0.179} stopColor='#AFBCBC' stopOpacity={0.179} />
               <stop offset={1} stopColor='#5B6A6A' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint5_linear'
               x1={54.064}
               x2={37.353}
               y1={28.541}
               y2={11.83}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FFC200' stopOpacity={0} />
               <stop offset={0.161} stopColor='#FDBB00' stopOpacity={0.161} />
               <stop offset={0.397} stopColor='#F7A700' stopOpacity={0.397} />
               <stop offset={0.678} stopColor='#EE8700' stopOpacity={0.678} />
               <stop offset={0.992} stopColor='#E05B00' stopOpacity={0.992} />
               <stop offset={1} stopColor='#E05A00' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint6_linear'
               x1={24.001}
               x2={24.001}
               y1={44.078}
               y2={46.775}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FFC200' />
               <stop offset={0.268} stopColor='#FB0' />
               <stop offset={0.659} stopColor='#FFA801' />
               <stop offset={1} stopColor='#FF9102' />
            </linearGradient>
            <linearGradient
               id='IDMFolderIcon__paint7_linear'
               x1={24.468}
               x2={24.468}
               y1={41.128}
               y2={37.978}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF9102' />
               <stop offset={0.128} stopColor='#FF9409' />
               <stop offset={0.314} stopColor='#FF9C1D' />
               <stop offset={0.537} stopColor='#FFAA3D' />
               <stop offset={0.785} stopColor='#FFBC69' />
               <stop offset={1} stopColor='#FFCF95' />
            </linearGradient>
         </defs>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 32,
   height: 32
}

export default SvgComponent
