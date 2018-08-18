import React, { Component } from 'react';
import {connect} from 'react-redux';
import Article from './Article';
import Loading from './Loading';
import {loadBlog} from '../AC';
import '../style.css';


class Blog extends Component {

  state = {
    articles: [],
    views: true,
    date: true
  };

  componentDidMount() {
    const {loadBlog} = this.props;
    loadBlog();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.blog.defArticles
    });
  }

  handleChange = e => {
    const {blog} = this.props;
    const value = e.target.value.toLowerCase();
    const articles = blog.defArticles.filter(article => {
      const {title, text} = article;
      const isDefined = title.toLowerCase().includes(value) ||  text.toLowerCase().includes(value);
      return isDefined
    });

    this.setState({
      articles
    });
  };

  handleSort = (type) => {
    const {articles} = this.state;
    let isSorted = this.state[type];
    let direction = isSorted ? 1 : -1;


    const sorted = articles.slice().sort((a, b) => {
      if (type === 'date') {
        if (new Date(a[type]) === new Date(b[type])) { return 0; }
        return new Date(a[type]) > new Date(b[type]) ? direction : direction * -1;
      } else {
        if (a[type] === b[type]) { return 0; }
        return a[type] > b[type] ? direction : direction * -1;
      }
    });

    this.setState({
      articles: sorted,
      [type]: !isSorted
    });
  };

  render() {
    const {articles, views, date} = this.state;
    const {blog} = this.props;
    const articleElements = articles.map(article =>
      <li key={article.id}>
        <Article article = {article} />
      </li>
    );

    return (
      <div className="wrap">
        <div className="header">
          <label>
            Search:
            <input
              type="text"
              onChange={this.handleChange}
            />
          </label>        
          <p
            className={views ? 'sort sort_active' : 'sort'}
            onClick={() => this.handleSort('views')}
          >
            <span className="arrow">&#11015;</span>
            Sort by views
          </p>
          <p

            className={date ? 'sort sort_active' : 'sort'}
            onClick={() => this.handleSort('date')}
          >
            <span className="arrow">&#11015;</span>
            Sort by date
          </p>
        </div>
        {blog.isLoading ? <Loading /> : <ul>{articleElements}</ul>}
      </div>
    );
  }
}

export default connect((state) => ({
  blog: state.blog
}), {loadBlog})(Blog)
