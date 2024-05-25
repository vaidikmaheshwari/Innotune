import {createContext, useState} from 'react';
import React from 'react';
type Props = {
  children: React.ReactNode;
};
type LoginObject = {
  name: string;
  email: string;
  password: string;
  userName: string;
};
// const Login: LoginObject = {
//   name: '',
//   email: '',
//   password: '',
//   userName: '',
// };
export const LoginContext = createContext<{
  loginObj: LoginObject;
  setLoginObj: React.Dispatch<React.SetStateAction<LoginObject>>;
}>({
  loginObj: {email: '', name: '', password: '', userName: ''}, // Provide an initial value for loginObj
  setLoginObj: () => {},
});
const LoginProvider = ({children}: Props) => {
  const [loginObj, setLoginObj] = useState<LoginObject>({
    email: '',
    name: '',
    password: '',
    userName: '',
  });

  return (
    <LoginContext.Provider value={{loginObj, setLoginObj}}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
