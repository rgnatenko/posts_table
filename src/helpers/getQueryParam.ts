import { useLocation } from 'react-router-dom';

export const  useQueryParam = (paramName: string) => {
  const location = useLocation();
  return new URLSearchParams(location.search).get(paramName);
};

export default useQueryParam;
