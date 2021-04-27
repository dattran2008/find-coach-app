export default (action, component) => [
  {
    label: 'Login',
    content: component,
    method: action.login,
    isRegister: false,
  },
  {
    label: 'Register',
    content: component,
    method: action.signup,
    isRegister: true,
  },
];
