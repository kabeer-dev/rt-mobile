import { QUERY_KEYS } from '../../constants';
import { useQuery } from '../../utils';
import { fetchMe } from '../services/userService';

export const useMeQuery = (enabled = true) =>
  useQuery({ queryKey: QUERY_KEYS.me, queryFn: fetchMe, enabled });
