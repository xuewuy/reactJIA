import React, { Component, PropTypes } from 'react'

import { Input } from 'antd'


export default class NumericInputComponent extends Component {

    state = {
        oldValue: "",
        disabled: false,
        value: "",
        max: Infinity,
        min: -Infinity,
        format: ""
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props) {
        let data = {}

        if (props.value !== undefined) {
            data.value = props.value + ''
            data.oldValue = data.value
        }

        if (props.min !== undefined && props.min !== null && props.min !== '' && !isNaN(props.min))
            data.min = props.min

        if (props.max !== undefined && props.max !== null && props.max !== '' && !isNaN(props.max))
            data.max = props.max

        if (props.format)
            data.format = props.format

        data.disabled = props.disabled

        return data
    }

    getCurrentValidValue(value, oldVal) {
        let val = value

        const props = this.props
        if (val === '') {
            return ''
        } else if (!this.isNotCompleteNumber(val)) {
            val = Number(val)
            if (value < this.state.min || value > this.state.max) {
                return value.substr(0, value.length - 1)
            }
        } else {
            return this.state.value
        }
        return value
    }

    toNumber(num) {
        if (this.isNotCompleteNumber(num)) {
            return num
        }
        return Number(num)
    }

    isNotCompleteNumber(num) {
        return (
            isNaN(num) ||
            num === '' ||
            num.toString().indexOf('.') === num.toString().length - 1
        )
    }

    toPrecisionAsStep(num) {
        if (this.isNotCompleteNumber(num) || num === '') {
            return num
        }
        const precision = Math.abs(this.getMaxPrecision(num))
        if (precision) {
            return Number(num).toFixed(precision)
        }
        return num.toString()
    }

    getMaxPrecision(currentValue) {
        const { step } = this.props
        let stepPrecision = this.getPrecision(currentValue)
        if (step)
            stepPrecision = this.getPrecision(step)
        return stepPrecision
    }

    getPrecision(value) {
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 1), 10)
        }
        let precision = 0;
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1
        }
        return precision
    }

    onInput(e) {
        let { value } = e.target
        //去除逗号
        value = value.replace(/\,/g, '')

        //第一个字符是0，第二个不是.去除掉0
        if (value.length > 1 && value.substring(0, 1) == 0 && value.substring(1, 2) != '.') {
            value = value.substring(1)
        }

        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/

        //是数字或者是空或者是-
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

            //最后一个字符是不是. 并且 数字不是-
            if (value.charAt(value.length - 1) !== '.' && value !== '-') {
                value = this.getCurrentValidValue(value)
                this.setState({ value: value + '' })
                this.state.oldValue != value && this.props.onInput && this.props.onInput(this.toNumber(this.toPrecisionAsStep(value)))
            }
            else {
                this.setState({ value: value + '' })
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {

        if (
            (this.currentValue === nextState.value || (Number(nextProps.value) !== Number(this.state.value)))
        ) {
            return true
        } else {
            for (var o in this.props) {

                if (this.props[o] != nextProps[o]) {
                    return true
                }
            }
            return false
        }
    }
    onChange(e) {
        let { value } = e.target
        //去除逗号
        value = value.replace(/\,/g, '')

        const isZero = parseFloat(value) === 0 

        //第一个字符是0，第二个不是.去除掉0
        if (value.length > 1 && value.substring(0, 1) == 0 && value.substring(1, 2) != '.' && !isZero) {
            value = value.substring(1)
        }

        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        const { step } = this.props
        if (isZero) {
            this.currentValue = value + ''
            this.setState({ value: value + '' })
            this.state.oldValue != value && this.props.onChange && this.props.onChange(this.toNumber(this.toPrecisionAsStep(value)))
            return
        }

        //是数字或者是空或者是-
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            //最后一个字符是不是. 并且 数字不是-
            if (value.charAt(value.length - 1) !== '.' && value !== '-') {
                value = this.getCurrentValidValue(value)
                if (this.getStep(value) > this.getStep(step)) {
                    value = this.toPrecisionAsStep(value)
                }

                this.currentValue = value + ''
                this.setState({ value: value + '' })
                this.state.oldValue != value && this.props.onChange && this.props.onChange(this.toNumber(this.toPrecisionAsStep(value)))
            }
            else {
                this.currentValue = value + ''
                this.setState({ value: value + '' })
            }
        }
    }
    getStep(str) {
        let strAfterPoint = (str + '').split('.')[1]
        return strAfterPoint && strAfterPoint.length ? strAfterPoint.length : 0
    }
    /*onFocus(str) {
        // 此处不要删
    onFocus = {::this.onFocus }
    }*/
    onBlur() {
        let value = this.state.value

        //最后一个字符是.或者-那么去掉
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            value = value.slice(0, -1)
            value = this.getCurrentValidValue(value)

            this.setState({ value: value + '' })
            this.state.oldValue != value && this.props.onChange && this.props.onChange(this.toNumber(this.toPrecisionAsStep(value)))
        }

        this.state.oldValue != value && this.props.onBlur && this.props.onBlur(this.toNumber(this.toPrecisionAsStep(value)))
    }

    render() {
        return (
            <Input
                {...this.props}
                onChange={::this.onChange}
    onBlur = {::this.onBlur }
    disabled = { this.state.disabled }
    value = { this.state.value }
    />
        )
}
}
