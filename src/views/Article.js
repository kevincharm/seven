import React from 'react'
import './Article.css'

function parseBlocks(blocks) {
    return blocks
    .filter(b => b.kind === 'text')
    .map(b => b.text)
}

/**
 *  Returns an array of paragraph text.
 */
function parseContent(article) {
    const { items } = article
    return items.filter(i => i.kind === 'content')
    .map(content => parseBlocks(content.blocks))
    .reduce((p, c) => p.concat(c))
}

const Article = (article, isActive, handleOpen, handleClose) => {
    const {
        id,
        homepageHead,
        headKicker,
        mainImage,
        byline
    } = article

    const articleClasses = ['article']
    if (isActive) articleClasses.push('article--active')

    return (
        <div className={articleClasses.join(' ')} ref={id} key={id}
            onClick={() => handleOpen(id)}>
            { isActive &&
                <button className="article__button" onClick={handleClose}>
                    {'‹'} Back to Latest
                </button>
            }
            <img className="article__hero" src={mainImage.reference} alt={mainImage.captionText} />
            <div className="article__content">
                <div className="article__content__kicker">{headKicker}</div>
                <h1 className="article__content__heading">{homepageHead}</h1>
                {
                    isActive &&
                    <div>
                        <div>
                            {parseContent(article).map((text, idx) => <p key={idx}>{text}</p>)}
                        </div>
                        <div className="article__content__byline">{byline}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Article
