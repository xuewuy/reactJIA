import React from 'react'
import * as xc from 'xComponent'
import componentFactory from './componentFactory'

import Input from './component/input'
import Password from './component/password'
import InputNumber from './component/inputNumber'
import Checkbox from './component/checkbox'
import Switch from './component/switch'
import DatePicker from './component/datePicker'
import MonthPicker from './component/monthPicker'
import Select from './component/select'
import Grid from './component/grid'
import Grid2 from './component/grid/grid2'
import Tabs from './component/tabs'
import FormItems from './component/form/formItems'
import FormItem from './component/form/formItem'
import Form from './component/form'
import Toolbar from './component/toolbar'
import DynamicPage from './component/dynamicPage'
import Reference from './component/reference'
import ColumnHeader from './component/grid/columnHeaderCell'
import DisplayCell from './component/grid/displayCell'
import Cell from './component/grid/cell'
import Tree from './component/tree'
import Radio from './component/radio'
import Link from './component/link'
import MultiLink from './component/multiLink'
import Click from './component/click'
import Pagination from './component/pagination'
import {modal} from './modal'
import Address from './component/address'
import Button from './component/button'
import MatrixEditor from './matrixEditor'
import MatrixPro from './matrixPro'
import AntGrid from './component/antGrid'
import AntTable from './component/antTable'
import PopModifyLabel from './component/popModifyLabel'
import Retrieve from './component/retrieve'
import RangePicker from './component/rangePicker'
import PopUpMenuTree from './component/popUpMenuTree'
import Text from './component/text'
import DateRangePicker from './component/dateRangePicker'
import Cascader from './component/cascader'
import Attachment from './component/attachment'
import CellTips from './component/cellTips'
import Layout from './component/layout'
import Dropdown from './component/dropdown'
import FixedColumn from './component/fixedColumn'
import MovablePanel from './component/movablePanel'
import ZIcon from './component/zIcon'
import AntRadio from './component/antRadio.js'
import Picture from './component/picture.js'
import TextInput from './component/textInput.js'

const {TimePicker} = xc

componentFactory.registerComponents({
    'Input': Input,
    'Password': Password,
    'InputNumber': InputNumber,
    'TimePicker': TimePicker,
    'Select': Select,
    'Radio': Radio,
    'Checkbox': Checkbox,
    'Switch': Switch,
    'Grid': Grid,
    'Grid2': Grid2,
    'Tabs': Tabs,
    'Form': Form,
    'FormItems': FormItems,
    'FormItem': FormItem,
    'Toolbar': Toolbar,
    'DatePicker': DatePicker,
    'MonthPicker': MonthPicker,
    'DynamicPage': DynamicPage,
    'Reference': Reference,
    'ColumnHeaderCell': ColumnHeader,
    'DisplayCell': DisplayCell,
    'Cell': Cell,
    'Modal': modal,
    'Tree': Tree,
    'Pagination': Pagination,
    'Link': Link,
    'MultiLink': MultiLink,
    'Click': Click,
    'Address': Address,
    'Button': Button,
    'MatrixEditor': MatrixEditor,
    'MatrixPro': MatrixPro,
    'AntGrid': AntGrid,
    'AntTable': AntTable,    
    'PopModifyLabel': PopModifyLabel,
    'Retrieve': Retrieve,
    'RangePicker': RangePicker,
    'PopUpMenuTree': PopUpMenuTree,
    'Text': Text,
    'DateRangePicker': DateRangePicker,
    'Cascader': Cascader,
    'Attachment': Attachment,
    'CellTips': CellTips,
    'Layout': Layout,
    'Dropdown': Dropdown,
    'FixedColumn': FixedColumn,
    'MovablePanel': MovablePanel,
    'ZIcon': ZIcon,
    'AntRadio':AntRadio,
    'Picture':Picture,
    'TextInput':TextInput
})

componentFactory.setDefaultComponents({
    'string': 'Input',
    'int': 'InputNumber',
    'float': 'InputNumber',
    'bool': 'Checkbox',
    'date': 'DatePicker',
    'time': 'TimePicker',
    'array': 'Grid'
})

export default componentFactory
