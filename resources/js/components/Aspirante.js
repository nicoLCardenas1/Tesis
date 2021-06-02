import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { offers } from './redux/actions/oferts';


const styleTable = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const table = {
    overflowX: 'auto',
    display: 'block',
    width: 'max-content'
}

export const Aspirante = () => {
    const [snies, setSnies] = useState('')
    const [search, setSearch] = useState({})
    const [dinamicOffer, setDinamicOffer] = useState([])
    const [data, setData] = useState([])
    const user = useSelector(state => state.auth)
    const offer = useSelector(state => state.offer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!offer?.offers) {
            dispatch(offers());
        } else {
            setDinamicOffer(offer?.offers)
            setData(offer?.offers);
        }
    }, [offer?.offers]);

    const filter = () => {
        const newData = data.slice().filter(item => {
            let filter = false;
            if (!search.modalidad && !search.nivel_academico) {
                filter = true;
            } else if (search.modalidad === item.metodologia && search.nivel_academico === item.nivel_academico) {
                filter = true;
            } else {
                if (search.modalidad === item.metodologia && !search.nivel_academico) {
                    filter = true;
                } else if (search.nivel_academico === item.nivel_academico && !search.modalidad) {
                    filter = true;
                } else {
                    filter = false;
                }
            }

            if (filter && search.precio) {
                filter = item.precio <= Number(search.precio) + 500000 && item.precio >= Number(search.precio) - 500000;
            }

            if (filter && snies) {
                const merge = item.nombre_programa.toUpperCase() + " " + item.nombre_ies.toUpperCase();
                filter = merge.indexOf(snies.toUpperCase()) > -1;
            }

            return filter;
        });

        setDinamicOffer(newData);
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    <h4 className='text-primary'>Bienvenido: <span className='text-dark'>{user?.name}</span></h4>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Buscar por programa" aria-label="Buscar por programa" aria-describedby="button-addon2" onChange={(e) => setSnies(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={filter}>Buscar</button>
                        </div>
                    </div>
                    <div className="my-2">
                        <select className="custom-select w-auto mx-2" defaultValue={'DEFAULT'} onChange={(e) => search.modalidad = e.target.value}>
                            <option value="DEFAULT" required disabled>Tipo de modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Dual">Dual</option>
                            <option value="Distancia (virtual)">Distancia (virtual)</option>
                        </select>
                        <select className="custom-select w-auto mx-2" defaultValue={'DEFAULT'} onChange={(e) => search.nivel_academico = e.target.value}>
                            <option value="DEFAULT" required disabled>Nivel académico</option>
                            <option value="Posgrado">Posgrado</option>
                            <option value="Pregrado">Pregrado</option>
                        </select>
                        <div className="d-inline-flex col-sm-3 my-1">
                            <input type="number" className="form-control w-auto" placeholder="Precio" aria-label="Precio" aria-describedby="button-addon2" onChange={(e) => search.precio = e.target.value} />
                        </div>
                    </div>
                    <div style={styleTable}>
                        <table style={table} className="table table-hover">
                            <thead>
                                <tr className='bg-primary text-light text-center'>
                                    <th scope="col">Codigo SNIES</th>
                                    <th scope="col">N. IES</th>
                                    <th scope="col">N. Programa</th>
                                    <th scope="col">Sector</th>
                                    <th scope="col">Carácter Académico</th>
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">¿Acreditado?</th>
                                    <th scope="col">Jornada</th>
                                    <th scope="col">Num. Semestres</th>
                                    <th scope="col">Metodología</th>
                                    <th scope="col">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    offer?.offers
                                        ? dinamicOffer.length
                                            ?
                                            dinamicOffer.map((item, i) => (
                                                <tr key={i} className='text-center'>
                                                    <td>{item.codigo_snies}</td>
                                                    <td>
                                                        <Link
                                                            to={`/home/universidad/${item.nombre_ies}`}
                                                        >{item.nombre_ies}</Link>

                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/home/programa/${item.id}`}
                                                        >{item.nombre_programa}</Link>

                                                    </td>
                                                    <td>{item.sector_academico}</td>
                                                    <td>{item.caracter_academico}</td>
                                                    <td>{item.ubicacion}</td>
                                                    <td>{item.acreditado}</td>
                                                    <td>{item.jornada}</td>
                                                    <td>{item.numero_semestres}</td>
                                                    <td>{item.metodologia}</td>
                                                    <td>{item.precio}</td>

                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan={10}>No hay ofertas disponibles</td>
                                            </tr>
                                        : <tr>
                                            <td colSpan={10}>Cargando ofertas</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}