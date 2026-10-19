import { useMutation } from '../../utils';
import { register } from '../services/userService';

export const useRegisterMutation = () => useMutation({ mutationFn: register });
