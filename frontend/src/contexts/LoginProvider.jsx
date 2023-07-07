/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useReducer, useEffect, useState } from 'react';
import LoginContext from './LoginContext'


const LoginProvider = ({ children }) => {

    const initialState = {
        user: {},
        accessToken: null,
        isLogged: false,
        open: false
    }

    const loginReducer = (state, action) => {

        
        switch (action.type) {
            case "LOGIN":
                // llamada al backend
                const { name, email, role } = action.payload.user
                localStorage.setItem('name', JSON.stringify(name));
                localStorage.setItem('email', JSON.stringify(email));
                localStorage.setItem('role', JSON.stringify(role));
                localStorage.setItem('isLogged', JSON.stringify(action.payload.isLogged));
                localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
                return {
                    ...state,
                    user: action.payload.user,
                    accessToken: action.payload.accessToken,
                    isLogged: true,
                    open: false
                } //action.payload -> informaicon
            case "LOGOUT":
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('role');
                localStorage.removeItem('isLogged');
                localStorage.removeItem('accessToken');
                return {
                    ...state,
                    user: {},
                    accessToken: '',
                    isLogged: false,
                    open: false,
                    dateState : initialDateState
                }
            case 'TOGGLE_DROPDOWN':
                // Handle toggle dropdown action
                return {
                    ...state,
                    open: !state.open,
                };
            default:
                return state;
        }
    }

    const initialDateState = {
        start: null,
        end: null,
        productId: null
    }


    const [state, dispatch] = useReducer(loginReducer, initialState)
    const [dateState, setDateState] = useState(initialDateState) 

    const data = {
        dispatch,
        user: state.user,
        token: state.accessToken,
        isLogged: state.isLogged,
        open: state.open,
        date: dateState,
        setDateState
    }

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (isLogged) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        name: JSON.parse(localStorage.getItem('name')),
                        email: JSON.parse(localStorage.getItem('email')),
                        role: JSON.parse(localStorage.getItem('role'))
                    },
                    accessToken: JSON.parse(localStorage.getItem('accessToken')),
                    isLogged
                }
            });
        }
    }, []);

    return (
        <LoginContext.Provider value={data}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;

