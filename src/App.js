import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import Blog from './components/Blog'
import ArticlePage from './components/ArticlePage'


class App extends Component {

render() {
	return (
			<Switch>
				<Route path='/blog/:id' component={ArticlePage}/>
				<Route path='/blog' component={Blog}/>
			</Switch>
		)
	}
}

export default App

