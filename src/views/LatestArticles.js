import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connectToApi from '../components/connectToApi'
import Article from './Article'
import './LatestArticles.css'

class LatestArticles extends Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            activeArticleId: null
        }
    }

    isActive(id) {
        return this.state.activeArticleId === id
    }

    handleOpen(id) {
        if (!this.isActive(id)) {
            // New active article
            this.setState({
                activeArticleId: id
            })
            document.body.classList.add('locked')
        }
    }

    handleClose() {
        this.setState({
            activeArticleId: null
        })
        document.body.classList.remove('locked')
    }

    render() {
        const { articles, refresh } = this.props
        return (
            <div className="latest-articles">
                <button onClick={refresh}>Refresh</button>
                <div className="articles">
                    {articles.map(article => Article(
                        article,
                        this.isActive(article.id),
                        this.handleOpen,
                        this.handleClose
                    ))}
                </div>
            </div>
        )
    }
}

LatestArticles.propTypes = {
    articles: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
}

export default connectToApi(LatestArticles)
