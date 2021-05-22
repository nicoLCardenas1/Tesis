import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const state = useSelector(state => state.auth)
    const routes = [];
    if (state?.role === 'aspirante') {
        routes.push(
            {
                route: '/home/aspirantes',
                name: 'Ofertas'
            },
            {
                route: '/home/simulador',
                name: 'Simulador'
            },
            {
                route: '/home/orientacion-vocacional',
                name: 'Orientación vocacional'
            },
            {
                route: '/home/favoritos',
                name: 'Mis Favoritos'
            }
        )
    } else {
        routes.push(
            {
                route: '/home/representantes',
                name: 'Ofertas'
            },
            {
                route: '/home/postulados',
                name: 'Postulados'
            },
            {
                route: '/home/perfil',
                name: 'Editar pérfil'
            }
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Ies</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {routes.length
                        ? routes.map((route, i) => (
                            <li key={i + 1} className='nav-item'>
                                <Link className='nav-link' to={route.route}>{route.name}</Link>
                            </li>
                        ))
                        : <li className="nav-link" >Sin rutas</li>
                    }
                    <li className='nav-item'>
                        <a className="nav-link" href={`/logout`}>Salir</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
