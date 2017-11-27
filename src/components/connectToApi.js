import React, { Component } from 'react'
import { get } from 'axios'

export default function connectToApi(WrappedComponent) {
    // TODO(ktjiam): fix eslint rule here
    // eslint-disable-next-line
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                articles: []
            }
        }

        updateArticleContent(id, assets, items) {
            const { articles } = this.state
            const updatedArticles = articles.map(article => {
                if (article.id === id) {
                    Object.assign(article, { assets, items })
                }

                return article
            })
            this.setState({ articles: updatedArticles })
        }

        fetchArticleContents(articles) {
            return Promise.all(articles.map(article => {
                const { id } = article
                return get(`https://content.thewest.com.au/publication/${id}`)
            }))
            .then(responses => {
                responses.forEach(response => {
                    const { id, assets, items } = response.data
                    this.updateArticleContent(id, assets, items)
                })
            })
        }

        getLatestArticles() {
            this.setState({ articles: [] })

            return get('https://content.thewest.com.au/publication?kind=article')
            .then(response => {
                const { documents } = response.data
                this.setState({ articles: documents })
                return this.fetchArticleContents(documents)
            })
            .catch(console.error) // eslint-disable-line
        }

        componentWillMount() {
            this.getLatestArticles()
        }

        render() {
            return <WrappedComponent
                articles={this.state.articles}
                refresh={() => this.getLatestArticles()}
                {...this.props}
            />
        }
    }
}
