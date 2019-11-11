import React, {Component, PropTypes} from 'react'
import {Input, Menu, Icon, Switch} from 'xComponent'
import ReactDOM from 'react-dom'
import * as images from './images'
const SubMenu = Menu.SubMenu

export default class PortalLeftComponent extends Component {

    state = {
        searchText: ''
    }


    constructor(props) {
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }


    componentDidMount() {
        //this.props.initView()
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    shouldComponentUpdate(nextProps) {
        return true
    }


    componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }


    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        this.setState({time: new Date().getTime()})
    }


    handleMenuClick(e) {
        if (e.key === 'logout')
            this.props.onLogoutSucess()

        let getter = this.props.payload.getIn(['utils', 'getter']),
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            menus = getter('portal.menus', 'value'),
            industry = getterByField('currentOrg.industry')
        let menu = this.findMenu(menus, e.key)
        this.props.setMenuSelectedKeys(e.key)
        if(menu.get('id')== 2200 ||menu.get('id')== 214001 ||menu.get('id')== 214002 ||menu.get('id')== 214003 || menu.get('id')==2120 ){
            this.props.createUserLog(menu.get('id'),menu.get('name'))
        }
        if(menu.get('requestUrl') == 'apps/fi/manageTax/otherTax') {
            this.props.openIts()
        } else {
            this.props.addTab(menu.get('name'), menu.get('requestUrl'), {initData:menu.get('initData')})
        }
    }

    handleToggleMenuStyle(checked) {
        this.props.toggleMenuStyle()
    }

    handleSearchMenuTextChange(e) {
        this.setState({searchText: e.target.value})
    }


    findMenu(menus, menuId) {
        let ret 
        for (let menu of menus) {
            let id = menu.get('id'),
                subMenus = menu.get('subMenus')

            if (id.toString() === menuId)
                ret = menu

            if (!ret && subMenus)
                ret = this.findMenu(subMenus, menuId)
            
            if (!ret && menu.get('menuItemGroup'))
                ret = this.findMenu(menu.get('menuItemGroup'), menuId)

            if (ret) return ret
        }

        return undefined
    }

    getSubMenus(menus, level) {
        return menus.map((menu, index) => {
            let id = menu.get('id'),
                name = menu.get('name'),
                url = menu.get('requestUrl'),
                img = menu.get('imageName'),
                menuItemGroup = menu.get('menuItemGroup'),
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                subMenus = menu.get('subMenus'),
                currOrg = getterByField('currOrg').toJS(),
                industry = currOrg.industry,
                isBeta = menu.get('isBeta') === true ? true : false,
                isNew = menu.get('isNew') ===true ? true : false,
                editClient = menu.get('editClient') === true ? true : false,
                canyin = menu.get('canyin') === true ? true : false,
                title,icon
            if (subMenus || menuItemGroup) {

                if (menuItemGroup){
                    return (<Menu.ItemGroup key={id} title={name} >
                        {::this.getSubMenus(menuItemGroup, level + 1)}
                    </Menu.ItemGroup>)
                }

                if (level == 2){
                    if(isNew){
                        icon = <i className='portal-image-beta-level3'/>
                    }else if(isBeta){
                        icon = <i className='portal-image-beta-level2'/>
                    }else if(industry!=1006 && editClient){
                        icon = <i className='portal-image-beta-level4'/>
                    }else if(industry!=1006 && canyin){
                        icon = <i className='portal-image-beta-level5'/>
                    }else{
                        null
                    }
                    title =
                        <span style={{overflow: 'hidden'}}>
							{name}
                            {icon}
						</span>
                }else{
                    if(isNew){
                        icon = <i className='portal-image-beta-level3'/>
                    }else if(isBeta){
                        icon = <i className='portal-image-beta-level1'/>
                    }else if(industry!=1006 && editClient){
                        icon = <i className='portal-image-beta-level4'/>
                    }else if(industry!=1006 && canyin){
                        icon = <i className='portal-image-beta-level5'/>
                    }else{
                        null
                    }
                    title =
                        <span>
							{img ? images[img] : null}
                            <span style={{position: 'relative'}}>
								{name}
                                {icon}
							</span>
						</span>
                }

                return (<SubMenu key={id} title={title} >
                    {::this.getSubMenus(subMenus, level + 1)}
                </SubMenu>)
            }else {
                let style = level == 3 ? {marginLeft: 11, position: 'relative'} : undefined
                style = {position: 'relative', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis'} //¸Ä³Éµ¯³öÈ¥µô

                if (level == 2){
                    if(isNew){
                        icon = <i className='portal-image-beta-level3'/>
                    }else if(isBeta){
                        icon = <i className='portal-image-beta-level2'/>
                    }else if(industry!=1006 && editClient){
                        icon = <i className='portal-image-beta-level4'/>
                    }else if(industry!=1006 && canyin){
                        icon = <i className='portal-image-beta-level5'/>
                    }else{
                        null
                    }
                    title =
                        <span>
							{name}
                            {icon}
						</span>
                }else{
                    if(isNew){
                        icon = <i className='portal-image-beta-level3'/>
                    }else if(isBeta){
                        icon = <i className='portal-image-beta-level1'/>
                    }else if(industry!=1006 && editClient){
                        icon = <i className='portal-image-beta-level4'/>
                    }else if(industry!=1006 && canyin){
                        icon = <i className='portal-image-beta-level5'/>
                    }else{
                        null
                    }
                    title =
                        <span>
							{img ? images[img] : null}
                            <span style={style}>
								{name}
                                {icon}
							</span>

						</span>
                }
                return (
                    <Menu.Item key={id}>{title}</Menu.Item>
                )               
            }
        })
    }

    searchMenus(menus, searchText) {
        if (!menus || !searchText) return menus
        if (searchText.trim() === '') return menus
        let result = []
        menus.forEach((menu, index) => {
            if (menu.get('name').indexOf(searchText) !== -1 && !menu.get('subMenus') && !menu.get('menuItemGroup'))
                result.push(menu)
            if (menu.get('subMenus'))
                result = result.concat(this.searchMenus(menu.get('subMenus'), searchText))
            if (menu.get('menuItemGroup'))
                result = result.concat(this.searchMenus(menu.get('menuItemGroup'), searchText))
        })

        return result
    }

    render() {
        let {prefixCls, payload} = this.props,
            getter = payload.getIn(['utils', 'getter']),
            getterByField = payload.getIn(['utils', 'getterByField']),
            menus = getterByField('menus'),
            showMenu = getterByField('showMenu'),
            popMenu = getterByField('popMenu'),
            menuMode = popMenu ? 'vertical' : 'inline',
            menuHeight = window.innerHeight - 58 - 37,
            menuSelectedKeys = getterByField('menuSelectedKeys') || []
        menus = this.searchMenus(menus, this.state.searchText)

        if (!showMenu) return null

        let subMenus = this.getSubMenus(menus, 1)
        return (
            <div className={`${prefixCls}-left`}>
	      	<span className={`${prefixCls}-left-span`}>
				<i className={`${prefixCls}-left-span-i`}/>
                <Input className={`${prefixCls}-left-search`} placeholder='搜索菜单'
                       onChange={::this.handleSearchMenuTextChange}/>
	      	</span>
                <div className={`${prefixCls}-left-menu`} ref='menu' style={{height: menuHeight}}>
                    <Menu
                        theme='dark'
                        mode={menuMode}
                        multiple={true}
                        selectedKeys={menuSelectedKeys}
                        onOpenChange={::this.calculateBoundary}
                        onClick={::this.handleMenuClick}>
                        {subMenus}
                    </Menu>
                </div>
            </div>
        )
    }
    calculateBoundary(option){
        setTimeout(()=>{
            try{
                let  $dom = $('.ant-menu-submenu-open >ul')

                let dHeight = $('.ant-menu-submenu-open >ul').offset().top+$('.ant-menu-submenu-open >ul').height()-$(window).height()
                if(dHeight > 0){
                    // dHeight = -dHeight
                    $('.ant-menu-submenu-open >ul').css('top', -dHeight-10)
                }
                // else{
                //     $('.ant-menu-submenu-open >ul').css('top', 0)
                // }

            }catch(e){

            }


        },100)
    }
}

// <Switch
// 	checked={popMenu}
// 	onChange={::this.handleToggleMenuStyle}
// 	size='small'
// />


/*defaultOpenKeys={menus.map(menu=>menu.get('code'))}

 <Switch
 checked={popMenu}
 onChange={::this.handleToggleMenuStyle}
 checkedChildren={(<Icon type='right' />)}
 unCheckedChildren={<Icon type='down' />}
 />
 */
