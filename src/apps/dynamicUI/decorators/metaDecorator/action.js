import * as _a from 'dynamicAction'
const _g = _a.getter
const _f = _a.getterByField
var _i, _store


export function initView({com, store, event, utils}) {
    return injectFuns => {
        _i = injectFuns
        _store = store
        _i.reduce('initView', {event, utils})

        event.root.onLoad && event.root.onLoad()
    }
}

export function modal(option){
    return _a.modal({...option, store:_store})(_i)
}

export function getUtils(exps) {
    return {
        getter: (path, propertys) => {
            let r = exps.getter(path, propertys)
            if(typeof r === 'function'){
                return r(_i)
            }
            return r
                
        },
        getterByField: (fieldPath) => {
            let r = exps.getterByField(fieldPath)

            if(typeof r === 'function'){
                return r(_i)
            }
            return r
        },
        getterByAjax:(path, property, onSuccess)=>{
            let r = exps.getterByAjax(path, postData, onSuccess)

            if(typeof r === 'function'){
                return r(_i)
            }
            return r
        }
    }
}


export function onEvent(eventName, option) {
    let event = _f('event')(_i),
        parsedPath = _a.parsePath(option.path),
        eventSource = (parsedPath || { path: 'root' }).path

    if (event && event[eventSource] && event[eventSource][eventName]) {
        event[eventSource][eventName]({
            ...option,
            path: eventSource,
            rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined
        })
    } else {
        _a.onEvent(eventName, option)(_i)
    }
}

export function onFieldChange(path, oldValue, newValue) {
    let event = _f('event')(_i),
        parsedPath = _a.parsePath(path),
        eventSource = (parsedPath || { path: 'root' }).path

    if (event && event[eventSource] && event[eventSource]['onChange']) {
        event[eventSource]['onChange']({
            path: eventSource,
            rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined,
            oldValue,
            newValue
        })
    } else {
        _a.onFieldChange(path, oldValue, newValue)(_i)
    }
}


export function getter(path, propertys) {
    let ret = _a.getter(path, propertys)(_i)

    let event = _f('event')(_i),
        parsedPath = _a.parsePath(path),
        eventSource = (parsedPath || { path: 'root' }).path

    if (typeof propertys === 'string') {
        if (event && event[eventSource] && event[eventSource][propertys]) {
            ret = event[eventSource][propertys]({
                path: eventSource,
                rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined
            })
        }
        return ret
    }

    if(propertys.constructor === Array){
        for (let pt of propertys) {
            if (event && event[eventSource] && event[eventSource][pt]) {
                ret = ret.set(pt, event[eventSource][pt]({
                    path: eventSource,
                    rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined
                }))
            }
        }
    }

    return ret
}


export async function query(api, ...args) {

    if (args[0] === _i.printPost) {
        api.apply(this, args)
        return
    }

    let response = await api.apply(this, args)

    if (!_a.handleWebApiException(response)(_i))
        return Promise.reject(response)

    return Promise.resolve(response)
}

function wrapAction() {
    
    let exps = {..._a, ...exports }

    let keys = Object.keys(exps)

    let ret = {}
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (typeof exps[key] === 'function' ) {
            ret[key] = (...args) => {
                let r = exps[key](...args)
                if (typeof r === 'function' && key !== 'initView')
                    return r(_i)
                return r
            }
        } else {
            ret[key] = exps[key]
        }
    }

    ret["g"] = ret["getter"]
    ret["f"] = ret["getterByField"]
    ret["q"] = ret["query"]
    return ret
}


Object.assign(exports, {...wrapAction()})

