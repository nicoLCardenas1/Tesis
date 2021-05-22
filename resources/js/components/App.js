import React from 'react'
import { Provider } from "react-redux";
import { store } from './redux/store/store';
import { AppRouter } from './routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
