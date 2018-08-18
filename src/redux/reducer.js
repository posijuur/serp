import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import blog from './blog'

export default combineReducers({
    router, blog
})
