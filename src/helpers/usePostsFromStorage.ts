import { Post } from '../types/Post';
import parseDataFromStorage from './parseDataFromStorage';

export const usePostsFromStorage = () => parseDataFromStorage<Post[], []>('posts', []);
