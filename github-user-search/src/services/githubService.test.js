import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUserData } from './githubService';

describe('fetchUserData', () => {
  it('fetches user data successfully', async () => {
    const mock = new MockAdapter(axios);
    const username = 'testuser';
    const mockData = { login: username, id: 1 };

    mock.onGet(`https://api.github.com/users/${username}`).reply(200, mockData);

    const data = await fetchUserData(username);
    expect(data).toEqual(mockData);
  });

  it('throws an error when request fails', async () => {
    const mock = new MockAdapter(axios);
    const username = 'baduser';

    mock.onGet(`https://api.github.com/users/${username}`).reply(404);

    await expect(fetchUserData(username)).rejects.toThrow();
  });
});
