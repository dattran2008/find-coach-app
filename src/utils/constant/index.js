import AuthUser from '@/components/auth/index.vue';

export default (action) => [
  {
    label: 'Login',
    content: AuthUser,
    method: action.login,
    isRegister: false,
  },
  {
    label: 'Register',
    content: AuthUser,
    method: action.signup,
    isRegister: true,
  },
];
