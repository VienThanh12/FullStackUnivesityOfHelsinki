import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

import NewBlogForm from "./NewBlogForm"

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

    render(
        <Blog blog = {blog} addLikes = {mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    
    //screen.debug()
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('blog form', async () => {
    const createdBlog = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm createdBlog = {createdBlog}/>)

    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'fullstack')
    await user.type(inputs[1], 'kevin')
    await user.type(inputs[2], 'http://localhost:3000/')
    const sendButton = screen.getByText('create')

    await user.click(sendButton)
    expect(createdBlog.mock.calls).toHaveLength(1)
    expect(createdBlog.mock.calls[0][0].title).toBe('fullstack')
    expect(createdBlog.mock.calls[0][0].author).toBe('kevin')
    expect(createdBlog.mock.calls[0][0].url).toBe('http://localhost:3000/')

})  