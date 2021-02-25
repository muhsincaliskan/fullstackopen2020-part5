import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
describe('Blog component test', () => {
  const blog = {
    'user': {
      'id': 'RLtE33N',
      'username': 'mluukkai'
    },
    'title': 'test title',
    'author': 'TEST author',
    'url': 'htttp',
    'likes': 6,
    'id': 'n-OOoHJ'
  }
  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  test('renders content without details', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'test title TEST author'
    )
  })

  test('clicking the button calls event handler once', async () => {


    const component = render(
      <Blog blog={blog} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
    )
    const likeButton=component.getByText('Like')
    const viewButton=component.getByText('View')
    fireEvent.click(viewButton)
    fireEvent.click(likeButton)
    expect(component.container).toHaveTextContent(
      'test title TEST authorViewhtttp likes 6 LikecancelRemove'
    )
  })

})

