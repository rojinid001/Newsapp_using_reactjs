import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imageurl, newsurl, author, date,source } = this.props;
        let authorText = author ? `By ${author}` : 'By Unknown';

        return (
            <div>
                <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:1}}>
                            {source} 

                        </span>
                    <img
                        src={imageurl || 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'}
                        className="card-img-top"
                        alt=""
                    />

                    <div className="card-body">
                        <h5 className="card-title">{title}... </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">{authorText} on {date}</small></p>
                        <a href={newsurl} target="blank" className="btn btn-dark btn-sm">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
