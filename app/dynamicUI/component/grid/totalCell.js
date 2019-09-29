import React from 'react'
import Immutable, {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'
import DynamicComponent from '../../'

export default class TotalCellComponent extends React.Component{
  constructor(props){
      super(props)
  }


  render(){
      let {_path, _getter} = this.props,
        total = _getter(_path, 'totalValue'),
        precision = _getter(_path, 'precision'),
        totalComponent = _getter(_path, 'totalComponent')

        if(!isNaN(total)){
            if(precision){
              if(parseFloat(total).toFixed)
                  total = parseFloat(total).toFixed(precision)
            }
        }else{
            total = ''
        }

      if(!totalComponent)
      	return (<Cell style={{fontWeight:'bold',textAlign:'right'}}>{total}</Cell>)
      else
      	return (<DynamicComponent  {...this.props} _component={totalComponent} _path={_path} _value={total} />)
  }


}
