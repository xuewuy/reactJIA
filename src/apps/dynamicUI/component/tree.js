import React from 'react'
import {Map} from 'immutable'
import {Tree}  from 'xComponent'
import moment from 'moment'
const TreeNode = Tree.TreeNode

export default class TreeComponent extends React.Component {
  	state = {
  		data : Map({
  			value:null,
  			displayMember:'',
  			valueMember:'',
  			childrenMember:'',
  			checkedKeys:[],
  			selectedKeys:[]
  		})
  	}

	
    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
        return !this.state.data.equals(nextState.data)
    }
	
	componentDidMount(){
		$('.ant-tree').delegate('.z-tree-leaf','dblclick',this.handleDoubleClick)
	}
    calculateState(props){
        let { data } = this.state,
            {_getter, _getterByField, _path} = props,
            pValues = _getter(_path, ['value', 'checkedKeysPath', 'selectedKeysPath', 'expandedKeysPath', 'disabledKeysPath', 'displayMember', 'valueMember', 'childrenMember', 'checkable', 'enableToggle',  'defaultExpandAll', 'removeSelectStatus']),
            displayMember = pValues.get('displayMember'),
            valueMember = pValues.get('valueMember'),
            childrenMember = pValues.get('childrenMember'),
            value = pValues.get('value'),
            checkedKeysPath = pValues.get('checkedKeysPath'),
            expandedKeysPath = pValues.get('expandedKeysPath'),
            disabledKeysPath = pValues.get('disabledKeysPath'),
            checkedKeys = checkedKeysPath? _getterByField(checkedKeysPath) : undefined,
            selectedKeys = _getterByField(pValues.get('selectedKeysPath')),
            disabledKeys = pValues.get('disabledKeysPath') ? _getterByField(pValues.get('disabledKeysPath')) : undefined,
            checkable = pValues.get('checkable')  == undefined ? true: pValues.get('checkable') ,
            expandedKeys =  expandedKeysPath ? _getterByField(expandedKeysPath) :undefined,
            enableToggle = pValues.get('enableToggle') == undefined ? false: pValues.get('enableToggle'),
            defaultExpandAll = !!pValues.get('defaultExpandAll'),
            removeSelectStatus = pValues.get('removeSelectStatus')
		
        data = data.set('value', value)
        data = data.set('displayMember', displayMember)
        data = data.set('valueMember', valueMember)
        data = data.set('childrenMember', childrenMember)
        data = data.set('checkedKeys', checkedKeys)
        data = data.set('selectedKeys', removeSelectStatus ? [] : selectedKeys)
        data = data.set('expandedKeys', expandedKeys)
        data = data.set('disabledKeys', disabledKeys)
        data = data.set('checkable', checkable)
        data = data.set('enableToggle', enableToggle)
        data = data.set('defaultExpandAll', defaultExpandAll)
        return {data}
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }


    set(propertyName, value){
        let data = this.state.data
        return data.setIn(propertyName.split('.'),value)
    }

    renderTreeNode(data){
    	let displayMember = this.get('displayMember'),
    		valueMember = this.get('valueMember'),
    		childrenMember = this.get('childrenMember')

    	let ret =  data.map((item) => {
	    	let children = item.get(childrenMember),
                disabled = false,
                disabledKeys = this.get('disabledKeys'),
                v = item.get(valueMember),
                l = item.get(displayMember),
                isShow = item.get('isShow')

            if(isShow === false) return null

            
            if(disabledKeys){
                disabled = this.get('disabledKeys').findIndex(o=>item.get(valueMember) == o ) != -1
            }

		    if (children) {
		        return (
			        <TreeNode 
                        key={v} 
                        title={l}
                        disabled={disabled}>
			            {this.renderTreeNode(children)}
			        </TreeNode>
		        )
      		}
      		return (<TreeNode 
                className='z-tree-leaf' 
                key={v} 
                title={l} 
                isLeaf disabled={disabled} 
            />)
    	})
        let retNew = []
        ret.forEach(o=>{
            if(o)
                retNew.push(o)
        })
        return retNew
    }



    handleDoubleClick(e){
		this.props.onEvent && this.props.onEvent('onTreeDblClick', {path:this.props._path, e })    
    }

    handleCheck(keys,e){
    	this.props.onEvent && this.props.onEvent('onTreeCheck', {path:this.props._path, checkedKeys : keys,e})
    }

    handleSelect(keys,e){
    	this.props.onEvent && this.props.onEvent('onTreeSelect', {path:this.props._path, selectedKeys : keys,e})
    }

    handleExpand(keys, option){
        this.props.onEvent && this.props.onEvent('onTreeExpand', {path:this.props._path, expandKeys : keys, currentKey:option.node.props.eventKey})
    }

    render(){
        let params = {
            checkable:this.get('checkable'),
            selectedKeys:this.get('selectedKeys'),
            onCheck : this.handleCheck.bind(this),
            onSelect : this.handleSelect.bind(this),
            onExpand : this.handleExpand.bind(this) 
        }

        if(this.get('checkedKeys'))
            params.checkedKeys = this.get('checkedKeys')

        if(this.get('expandedKeys')){
            if(this.get('enableToggle') === true)
                params.expandedKeys=this.get('expandedKeys').toJS()
            else
                params.defaultExpandedKeys=this.get('expandedKeys').toJS()
         }

        if (this.get('defaultExpandAll'))
            params.defaultExpandAll = this.get('defaultExpandAll')

	    return(
	    	<Tree {...params}>
	    		{this.renderTreeNode(this.get('value'))}
	    	</Tree>
    	)
    }
	
}

