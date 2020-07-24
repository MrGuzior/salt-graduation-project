import React from 'react';

class News extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.news) {
            return (
                <div className="news" >
                    <a href={this.props.news.source} className="news-link">
                        <h3 className="news-heading">{this.props.news.heading}</h3>
                        <p className="news-text">{this.props.news.text} <span style={{ fontStyle: "italic" }}>...read more</span></p>
                    </a>
                </div>
            )
        } else {
            return <div></div>;
        }
    }
}

export default News;