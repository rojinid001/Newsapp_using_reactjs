import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      itemsPerPage: 5,
      currentArticleIndex: 0,
    };
  }

  async componentDidMount() {
    this.fetchData(this.state.page);
  }

  async fetchData(page) {
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=aa87e96766ca48b3b5ba7a1ddc9465a2&page=${page}`;


    let response = await fetch(url);
    let parsedData = await response.json();

    this.setState({
      articles: parsedData.articles,
      loading: false,
      page: page,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = () => {
    const { page, currentArticleIndex, articles, itemsPerPage } = this.state;
    if (currentArticleIndex + itemsPerPage < articles.length) {
      this.setState({ currentArticleIndex: currentArticleIndex + itemsPerPage }, () => {

        window.scrollTo(0, 0);
      });
    } else if (page * itemsPerPage < this.state.totalResults) {
      this.fetchData(page + 1);
      this.setState({ currentArticleIndex: 0 }, () => {

        window.scrollTo(0, 0);
      });
    }
  }

  handlePrevClick = () => {
    const { currentArticleIndex, page, itemsPerPage } = this.state;
    if (currentArticleIndex > 0) {
      this.setState({ currentArticleIndex: currentArticleIndex - itemsPerPage }, () => {
        window.scrollTo(0, 0);
      });
    } else if (page > 1) {
      this.fetchData(page - 1);
      this.setState({ currentArticleIndex: 0 }, () => {

        window.scrollTo(0, 0);
      });
    }
  }


  render() {
    const { articles, currentArticleIndex, itemsPerPage, loading } = this.state;
    const displayArticles = articles.slice(
      currentArticleIndex,
      currentArticleIndex + itemsPerPage
    );

    const disablePrev = currentArticleIndex === 0;
    const disableNext =
      currentArticleIndex + itemsPerPage >= articles.length;

    return (
      <div>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsDonkey-top nothing</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="container my-3">
            <div className="row">
              {displayArticles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={article.title ? article.title.slice(0, 45) : ''}
                    description={article.description ? article.description.slice(0, 88) : ''}
                    imageurl={article.urlToImage || ''}
                    newsurl={article.url || ''}
                    author={article.author || 'Unknown'} 
                    date={article.publishedAt || ''}
                    source={article.source.name}
                  />
                </div>
              ))}

            </div>
            <div className="container d-flex justify-content-between">
              <button type="button" disabled={disablePrev} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={disableNext} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
