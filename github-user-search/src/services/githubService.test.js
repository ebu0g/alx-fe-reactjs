// src/services/githubService.test.js
import axios from 'axios';
import { fetchUserData } from './githubService';

jest.mock('axios');

test('fetchUserData calls GitHub API with correct username', async () => {
  const mockUser = { login: 'octocat' };
  axios.get.mockResolvedValue({ data: mockUser });

  const result = await fetchUserData('octocat');
  expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/octocat');
  expect(result).toEqual(mockUser);
});
