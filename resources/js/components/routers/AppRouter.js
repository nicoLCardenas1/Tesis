import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataUser, test } from '../redux/actions/auth'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Navbar } from '../Navbar';
import { Aspirante } from '../Aspirante';
import { Representate } from '../Representate';
import { Simulate } from '../Simulate';
import { Program } from '../Program';
import { OrientacionVocacional } from '../OrientacionVocacional';
import { Favorite } from '../Favorite';
import { Home } from '../Home';
import { Postulados } from '../Postulados';
import { Perfil } from '../Perfil';
import { Universidad } from '../Universidad';

export const AppRouter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        //obtenemos el id de usuario que esta quemado en el blade de laravel y lo metemos en redux
        const user = document.getElementById('user');
        const role = document.getElementById('role');
        const name = document.getElementById('name');
        const ies = document.getElementById('ies');
        const snies = document.getElementById('snies');
        const sector = document.getElementById('sector');
        const caracterAcademico = document.getElementById('caracterAcademico');

        dispatch(dataUser(user.value, role.value, name.value, ies.value, snies.value, sector.value, caracterAcademico.value))
    }, [])

    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/home/programa/:id" component={Program} />
                    <Route path="/home/postulados" component={Postulados} />
                    <Route path="/home/favoritos" component={Favorite} />
                    <Route path="/home/orientacion-vocacional" component={OrientacionVocacional} />
                    <Route path="/home/simulador" component={Simulate} />
                    <Route path="/home/aspirantes" component={Aspirante} />
                    <Route path="/home/representantes" component={Representate} />
                    <Route path="/home/perfil" component={Perfil} />
                    <Route path="/home/universidad/:id" component={Universidad} />
                    <Route path="/home" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}