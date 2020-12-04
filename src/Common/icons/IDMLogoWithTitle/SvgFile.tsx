import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={139} height={36} fill='none' viewBox='0 0 139 36' {...props}>
         <path
            fill='#fff'
            fillOpacity={0.9}
            d='M30 35.474h5.182V12.396H30v23.077zm8.993 0h6.898c7.856 0 12.147-4.006 12.147-11.356 0-7.483-4.423-11.72-12.114-11.72h-6.931v23.075zm5.182-4.768V17.165h1.65c4.324 0 6.997 1.39 6.997 6.754 0 5.562-2.772 6.787-7.459 6.787h-1.188zm34.032-18.309L73.19 27.163l-4.918-14.766H60.88v23.076h5.182V19.947l4.687 13.442h4.984l4.687-13.508v15.594h5.18V12.396h-7.394zm32.658 12.913V12.396h-4.291L95.55 27.163v2.914h10.331v5.396h4.984v-5.396h3.631v-4.768h-3.631zm-9.077 0l4.093-5.761v5.76h-4.093zm13.766 10.164h4.621v-4.702h-4.621v4.702zm15.095.331c7.691 0 8.351-7.35 8.351-12.019C139 19.45 138.439 12 130.649 12c-7.756 0-8.35 7.383-8.35 11.786 0 4.669.66 12.019 8.35 12.019zm0-4.768c-2.904 0-3.267-3.344-3.267-7.085 0-3.907.363-7.151 3.267-7.151 2.905 0 3.268 3.244 3.268 7.151 0 3.741-.363 7.085-3.268 7.085z'
         />
         <path
            fill='url(#prefix__paint0_linear)'
            fillRule='evenodd'
            d='M2.462 28.547l9.649-6.854-5.59 5.39c.133.4.2.799.266 1.265h8.119c.732-6.056 6.72-6.455 6.72-13.974 0-2.795-1.064-5.324-2.728-7.187l-6.055 6.455H17.9C12.71 18.566 7.52 23.49 2.462 28.547z'
            clipRule='evenodd'
         />
         <path
            fill='url(#prefix__paint1_linear)'
            fillRule='evenodd'
            d='M15.571 0L3.793 15.571l5.59-.066-4.658 8.251C2.728 21.227 0 19.431 0 14.44 0 8.717 4.392 4.06 9.982 3.593l-5.723 6.655L15.57 0z'
            clipRule='evenodd'
         />
         <path
            fill='#fff'
            fillOpacity={0.9}
            fillRule='evenodd'
            d='M6.987 29.479h7.72c.398 0 .731.332.731.732a.739.739 0 01-.732.732H6.987a.738.738 0 01-.732-.732c0-.4.333-.732.732-.732zm-.266 2.795c0 .399.333.732.732.732h6.72a.74.74 0 00.733-.732c0-.4-.333-.732-.732-.732H7.453c-.4 0-.732.332-.732.732zm1.065 1.397C7.919 34.935 9.249 36 10.846 36c1.598 0 2.862-.998 3.062-2.329H7.786z'
            clipRule='evenodd'
         />
         <defs>
            <linearGradient
               id='prefix__paint0_linear'
               x1={2.462}
               x2={21.627}
               y1={17.867}
               y2={17.867}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
            <linearGradient
               id='prefix__paint1_linear'
               x1={0}
               x2={15.571}
               y1={11.878}
               y2={11.878}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
         </defs>
      </svg>
   )
}

export default SvgComponent
