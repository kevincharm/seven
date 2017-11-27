import '../setupTests'
import React from 'react'
import ReactDOM from 'react-dom'
import Article from './Article'
import { shallow, render } from 'enzyme'

const mockArticle = {
    id: 'B88669206Z',
    heading: 'Jewish and Islamic leaders in plea over same-sex marriage: ‘don’t penalise us for our beliefs’',
    byline: 'Nick Butterly',
    headKicker: 'Religious leaders',
    homepageHead: 'Same-sex marriage: ‘don’t penalise us for our beliefs’',
    homepageTeaser: 'Rabbi says religious leaders should teach beliefs but not discrimination.',
    mainImage: {
        reference: 'https://images.thewest.com.au/publication/B88669206Z/1511602171181_G801BEQA6.2-1.jpg',
        captionText: 'Rateb Jneid and Dovid Freilich say they should be allowed to teach beliefs - but that doesn’t mean they will pass on discrimination.',
        original: {
            format: 'image/jpeg',
            dimensions: '4000x2667',
            reference: '1511602171181_G801BEQA6.2-0.jpg'
        }
    },
    items: [
        {
            kind: 'byline',
            version: 1,
            text: 'Nick Butterly',
            name: 'Nick Butterly',
            credit: null,
            highlight: null,
            dateline: null
        },
        {
            kind: 'content',
            version: 1,
            blocks: [
                {
                    kind: 'text',
                    text: 'Perth’s Jewish and Islamic leaders say any new laws allowing same-sex marriage should provide certainty for the major religions that they will not be penalised for preaching their beliefs.',
                    intentions: []
                },
                {
                    kind: 'text',
                    text: 'However, Perth’s Chief Rabbi and top Islamic figure say most protections they needed were already in place. ',
                    intentions: []
                }
            ]
        },
        {
            kind: 'head-kicker',
            version: 1,
            text: 'Religious leaders'
        },
        {
            kind: 'heading',
            version: 1,
            text: 'Jewish and Islamic leaders in plea over same-sex marriage: ‘don’t penalise us for our beliefs’'
        },
        {
            kind: 'homepage-head',
            version: 1,
            text: 'Same-sex marriage: ‘don’t penalise us for our beliefs’'
        },
        {
            kind: 'homepage-teaser',
            version: 1,
            text: 'Rabbi says religious leaders should teach beliefs but not discrimination.'
        }
    ]
}

describe('Article', () => {
    it('should render main image', () => {
        const rendered = render(Article(mockArticle, true))
        expect(rendered.find('.article__hero').prop('src'))
        .toEqual('https://images.thewest.com.au/publication/B88669206Z/1511602171181_G801BEQA6.2-1.jpg')
    })

    it('should render kicker', () => {
        const rendered = render(Article(mockArticle, true))
        expect(rendered.find('.article__content__kicker').text())
        .toEqual('Religious leaders')
    })

    it('should render heading', () => {
        const rendered = render(Article(mockArticle, true))
        expect(rendered.find('.article__content__heading').text())
        .toEqual('Same-sex marriage: ‘don’t penalise us for our beliefs’')
    })

    it('should trigger handleOpen on click', () => {
        const handleOpen = jest.fn()
        const rendered = shallow(Article(mockArticle, true, handleOpen))
        rendered.find('.article').simulate('click')
        expect(handleOpen).toBeCalled()
    })

    it('should trigger handleClose on clicking close button', () => {
        const handleClose = jest.fn()
        const rendered = shallow(Article(mockArticle, true, null, handleClose))
        rendered.find('.article__button').simulate('click')
        expect(handleClose).toBeCalled()
    })
})
