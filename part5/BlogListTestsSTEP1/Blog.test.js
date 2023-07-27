import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render title and author', () => {
    const blog = {
        title: "Fullstack",
        author: "Kevin",
        user: {
            name: "Kevin"
        }
    }

    const { container } = render(<Blog blog = {blog}/>)
    screen.debug()
    const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'Fullstack Kevin'
        )
})