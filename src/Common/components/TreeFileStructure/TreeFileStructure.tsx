import React, { Component } from 'react'
import Tree from 'react-animated-tree'

import { TreeMenuWrapper } from './styledComponents'

interface TreeFileStructureProps {
   data: Array<any>
}
class TreeFileStructure extends Component<TreeFileStructureProps> {
   renderTreeStructure = (data: any): React.ReactNode =>
      data.map(eachTreeObject => {
         if (eachTreeObject.nodes.length === 0) {
            return (
               <Tree key={eachTreeObject.id} content={eachTreeObject.label} />
            )
         }
         return (
            <Tree key={eachTreeObject.id} content={eachTreeObject.label}>
               {this.renderTreeStructure(eachTreeObject.nodes)}
            </Tree>
         )
      })

   render(): React.ReactNode {
      const { data } = this.props
      return (
         <TreeMenuWrapper>
            <Tree key='Home' content='Home'>
               {this.renderTreeStructure(data)}
            </Tree>
         </TreeMenuWrapper>
      )
   }
}

export default TreeFileStructure
