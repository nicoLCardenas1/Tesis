import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createOffer, offers } from './redux/actions/oferts';
import { useDebounce } from 'use-debounce';

const Input = styled.input`
  border: none;
  height: 100%;
  min-height: 35px;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  text-align: center;
  color: gray;
`;

export const Aspirante = () => {
    const [snies, setSnies] = useState('')
    const [dinamicOffer, setDinamicOffer] = useState([])
    const user = useSelector(state => state.auth)
    const offer = useSelector(state => state.offer)
    const dispatch = useDispatch();
    const [value] = useDebounce(snies, 1000);

    useEffect(() => {
        console.log('***', offer?.offers)
        if (!offer?.offers) dispatch(offers())
        if (offer?.offers) setDinamicOffer(offer?.offers)
    }, [setSnies, offer?.offers]);

    const restarData = () => {
        setDinamicOffer(offer?.offers)
        setSnies('')
    }

    const filter = (e) => {
        var text = e.target.value
        const data = dinamicOffer
        const newData = data.filter(item => {
            const id = item.id
            const codigo_snies = item.codigo_snies.toUpperCase()
            const codigo_ies = item.codigo_ies.toUpperCase()
            const nombre_ies = item.nombre_ies.toUpperCase()
            const nombre_programa = item.nombre_programa.toUpperCase()
            const sector_academico = item.sector_academico.toUpperCase()
            const caracter_academico = item.caracter_academico.toUpperCase()
            const ubicacion = item.ubicacion.toUpperCase()
            const acreditado = item.acreditado.toUpperCase()
            const jornada = item.jornada.toUpperCase()
            const numero_semestres = item.numero_semestres.toUpperCase()
            const metodologia = item.metodologia.toUpperCase()
            //merge seacrh
            const campo = id + " " + codigo_snies + " " + codigo_ies + " " + nombre_ies + " " + nombre_programa + " " + sector_academico + " " + caracter_academico + " " + ubicacion + " " + acreditado + " " + jornada + " " + numero_semestres + " " + metodologia
            const textData = text.toUpperCase()
            console.log('result index of', campo.indexOf(textData) > -1);
            return campo.indexOf(textData) > -1
        })
        setDinamicOffer(newData)
        setSnies(text)
    }


    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    <h4 className='text-primary'>Bienvenido: <span className='text-dark'>{user?.name}</span></h4>
                    <table className="table table-hover">
                        <thead>
                            <tr className='text-center'>
                                <th scope="row">{/* <Input type='text' placeholder='ID' /> */}</th>
                                <td colSpan={8}><Input type='text' className='form-control mb-3 w-10 d-inline' placeholder='Buscador' value={snies} onChange={(snies) => filter(snies)} /></td>
                                <td colSpan={1}><Input type='button' className='btn' value='restaurar' onClick={() => restarData()} /></td>
                            </tr>

                            <tr className='bg-primary text-light text-center'>
                                <th scope="col">ID</th>
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
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offer?.offers
                                    ? dinamicOffer.length
                                        ?
                                        dinamicOffer.map((item, i) => (
                                            <tr key={i} className='text-center'>
                                                <th scope="row">{item.id}</th>
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
                                                <td>
                                                    <Link
                                                        to={`/home/programa/${item.id}`}
                                                        className='btn btn-sm btn-warning text-light'
                                                    > Ver...</Link>
                                                </td>
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
    )
}