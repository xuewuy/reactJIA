import * as da from 'dynamicAction'

export function listenTabFocus() {
    return injectFuns => {
    }
}

export function listenAddTab(props){
	return injectFuns => {

	}
}

export function listenTabClose(closeTab){
	return injectFuns =>{
		closeTab()
	}
}

Object.assign(exports, {...da, ...exports })