/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.REACT_APP_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const request = async<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  const response = await fetch(`${API_URL}/${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE')
};
