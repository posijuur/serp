import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loading from './Loading';
import {loadBlog} from '../AC';

class ArticlePage extends Component {

  componentDidMount() {
    const {loadBlog, blog} = this.props;
    
    if (blog.defArticles.length === 0) {
      loadBlog();
    }
  }

  render() {
    const {match, blog} = this.props;
    let article = [];
    blog.defArticles.map(item => {
      item.id == match.params.id ? article = item : null;
    });

    return (
      <div className="wrap">
      {blog.isLoading ?
        <Loading /> :
        <div>
          <h3>{article.title}</h3>
          <p>{article.text}</p>
          <p>Number of Views: {article.views}</p>
          <p>Upload date: {article.date}</p>
        </div>
      }
        
      </div>
    );
  }
}

export default connect((state) => ({
  blog: state.blog
}), {loadBlog})(ArticlePage)
