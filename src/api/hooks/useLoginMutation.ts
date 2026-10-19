import { useMutation } from '../../utils';
import { login } from '../services/userService';

export const useLoginMutation = () => useMutation({ mutationFn: login });
