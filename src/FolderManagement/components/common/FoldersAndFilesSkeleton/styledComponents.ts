import tw, { styled } from 'twin.macro'
import { FolderGridItemContainer } from '../FolderGridItem/styledComponents'
import { mobile } from '../../../../Common/utils/MixinUtils'
import { folderCardMetrics } from '../../../../Common/constants/MetricsConstants'

export const FolderAndFilesSkeletonCard = styled(FolderGridItemContainer)`
${tw`flex-col items-start`}
   min-height: ${folderCardMetrics.lgHeight};
   min-width: ${folderCardMetrics.lgWidth};
   margin: ${folderCardMetrics.margin};
   ${mobile} {
      ${tw`items-center justify-center`}
      min-height: ${folderCardMetrics.smHeight};
      min-width: ${folderCardMetrics.smWidth};
      margin: ${folderCardMetrics.margin};
   }
`
