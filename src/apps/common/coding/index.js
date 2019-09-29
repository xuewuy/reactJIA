import React from 'react'
import './coding.less'
export default class CodingComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'coding'
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.initView()
    }
    render() {
        if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils')){
            return (<div></div>)
        }
        let { prefixCls } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appServiceTel = getterByField('appServiceTel')
        /**
         * <img src={require('./images/coding.png')} alt="" width='120' />
         * <p style={{ marginTop: '20px'}}>披星戴月开发中，敬请期待～</p>
         */
        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-warp`}>
                    <img src={require('./images/header.png')} alt="" width='550' />
                    <img src={require('./images/centent.png')} alt="" width='820' />
                    <img src={require('./images/footer.png')} alt="" width='468' />
                    <p>立即升级，请您联系服务商：{appServiceTel}</p>
                </div>
            </div>
        )
    }
}
