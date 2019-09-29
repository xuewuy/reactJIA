import metaDecorator from '../metaDecorator'
import tabDecorator from '../tabDecorator'
const mr = metaDecorator.reducer
const tr = tabDecorator.reducer

Object.assign(exports, {...tr, ...mr, ...exports })