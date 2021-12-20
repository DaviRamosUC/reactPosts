import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '.';

import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

/* eslint-disable no-undef */
describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render searchInput, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);

    expect(screen.getByRole('heading', { name: /title 1 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: /title 1 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Search Value: title 1/i })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: /title 1 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();

    userEvent.type(search, 'posts do not exists');
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    screen.debug();

    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
