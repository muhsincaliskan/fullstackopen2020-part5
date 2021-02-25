import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const user={ id: '555', username: 'Muhsinc' }
  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { target: { value: 'Muhsin' } })
  fireEvent.change(title, { target: { value: 'TEST TITLE' } })
  fireEvent.change(url, { target: { value: 'TEST URL' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  //console.log(JSON.stringify(createNote.mock.calls[0][0].content, null, 2))
  expect(createBlog.mock.calls[0][0].author).toBe('Muhsin' )
})