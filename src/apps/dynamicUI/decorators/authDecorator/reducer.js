import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'


export default function authReducerCreator() {
    let ht = new HashTable()
    this.setColumnResize = (state, option) => {
        let { columnKey, newColumnWidth, path, appPath } = option
        if (columnKey && newColumnWidth) {
            ht.add(columnKey, newColumnWidth)
        }
        
        appPath = appPath.replace(/\//g, '-')
        //适应宽度拖动的不同场景
        if (window.localStorage) {
            if (localStorage.getItem(appPath)) {
                let currentColData = JSON.parse(localStorage.getItem(appPath))
                if (currentColData && currentColData.cols) {
                    let isUpdated = false
                    currentColData.cols.map((ele, i) => {
                        if (columnKey && ele) {
                            if (ele === columnKey) {
                                isUpdated = true
                                currentColData.width[i] = newColumnWidth
                            }
                        }
                    })
                    if (!isUpdated && columnKey) {
                        currentColData.cols.push(columnKey)
                        currentColData.width.push(newColumnWidth)
                    }
                }
                localStorage.setItem(appPath, JSON.stringify(currentColData))
            }
            else {
                localStorage.setItem(appPath, JSON.stringify({ 'cols': ht.getKeys(), 'width': ht.getValues() }))
            }
        }
        state = dr.setter(state, path + '.' + columnKey, 'flexGrow', 0)
        state = dr.setter(state, path + '.' + columnKey, 'width', newColumnWidth)
        
        return state
    }

    function HashTable() {
        var size = 0;
        var entry = new Object();
        this.add = function (key, value) {
            if (!this.containsKey(key)) {
                size++;
            }
            entry[key] = value;
        }
        this.getValue = function (key) {
            return this.containsKey(key) ? entry[key] : null;
        }
        this.remove = function (key) {
            if (this.containsKey(key) && (delete entry[key])) {
                size--;
            }
        }
        this.containsKey = function (key) {
            return (key in entry);
        }
        this.containsValue = function (value) {
            for (var prop in entry) {
                if (entry[prop] == value) {
                    return true;
                }
            }
            return false;
        }
        this.getValues = function () {
            var values = new Array();
            for (var prop in entry) {
                values.push(entry[prop]);
            }
            return values;
        }
        this.getKeys = function () {
            var keys = new Array();
            for (var prop in entry) {
                keys.push(prop);
            }
            return keys;
        }
        this.getSize = function () {
            return size;
        }
        this.clear = function () {
            size = 0;
            entry = new Object();
        }
    }
}