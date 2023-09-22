import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { NotFound } from '../Pages/NotFound.jsx'
import { Signup } from '../Pages/Signup.jsx'

describe('Routing', () => {
  it('存在しないルートにアクセスした場合、メッセージが表示される。', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="/non-existent-route" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('ページが見つかりませんでした。')).toBeInTheDocument()
  })

  it('存在するルートにアクセスした場合、メッセージが表示されない。', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    )

    // "ページが見つかりませんでした。" がDOMに存在しないことを確認する
    expect(screen.queryByText('ページが見つかりませんでした。')).toBeNull()
  })
})
