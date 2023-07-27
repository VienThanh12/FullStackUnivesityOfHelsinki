import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('render title and author', () => {
    const blog = {
        title: "Fullstack",
        author: "Kevin",
        user: {
            name: "Kevin"
        }
    }

    const { container } = render(<Blog blog = {blog}/>)
    //screen.debug()
    const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'Fullstack Kevin'
        )
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: "Fullstack",
        author: "Kevin",
        user: {
            name: "Kevin"
        },
        url: 'https://github.com',
        likes: 32
    }

    const { container } = render(
        <Blog blog = {blog}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    //screen.debug()
    const div = container.querySelector('.view')
    expect(div).toHaveTextContent(
        "https://github.com"
    )
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
        "32"
    )
    //console.log(div)
})

test('like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const blog = {
        title: "Fullstack",
        author: "Kevin",
        user: {
            name: "Kevin"
        },
        url: 'https://github.com',
        likes: 32
    }

    const mockHandler = jest.fn()

    const { container } = render(
        <Blog blog = {blog} addLikes = {mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    
    //screen.debug()
    expect(mockHandler.mock.calls).toHaveLength(2)
})