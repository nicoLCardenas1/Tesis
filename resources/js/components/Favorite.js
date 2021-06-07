import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GetHttpRequest } from './https/GetHttpRequest';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2'

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

export const Favorite = () => {
    const [snies, setSnies] = useState('')
    const [dinamicOffer, setDinamicOffer] = useState([])
    const user = useSelector(state => state.auth)
    const [offer, setOffer] = useState([])
    const dispatch = useDispatch();
    const [value] = useDebounce(snies, 1000);

    useEffect(() => {
        console.log('***', offer?.offers)
        //if (!offer?.offers) dispatch(offers())
        getFavoriteOffers()
    }, [setOffer]);

    const restarData = () => {
        getFavoriteOffers()
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

    const getFavoriteOffers = async () => {
        console.log('user: ', user)
        const data = {
            route: `/api/favorites/`,
            parametro: user?.user_id,
        };
        const request = await GetHttpRequest(data)
        setOffer(request);
        setDinamicOffer(request)
    }

    const handleDeleteOffer = (item) => {
        fetch(`/api/favorite/${user.user_id}/${item.id}`, {
            method: 'DELETE'
        })
            .then(data => data.json())
            .then(response => {
                if (response) {
                    Swal.fire({
                        title: 'Oferta eliminada',
                        text: 'La oferta se ha eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Cerrar'
                    });
                    setDinamicOffer(dinamicOffer.filter(offer => offer.id !== item.id));
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    <h4 className='text-primary'>Bienvenido: <span className='text-dark'>{user?.name}</span></h4>
                    <div style={styleTable}>
                        <table style={table} className="table table-hover">
                            <thead>
                                <tr className='text-center'>
                                    <td colSpan={8}><Input type='text' className='form-control mb-3 w-10 d-inline' placeholder='Buscador' value={snies} onChange={(snies) => filter(snies)} /></td>
                                    <td colSpan={1}><Input type='button' className='btn' value='restaurar' onClick={() => restarData()} /></td>
                                </tr>

                                <tr className='bg-primary text-light text-center'>
                                    <th scope="col">ID</th>
                                    <th scope="col">Codigo SNIES</th>
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
                                    dinamicOffer
                                        ? dinamicOffer.length
                                            ?
                                            dinamicOffer.map((item, i) => (
                                                <tr key={i} className='text-center'>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.codigo_snies}</td>
                                                    <td>{item.nombre_programa}</td>
                                                    <td>{item.sector_academico}</td>
                                                    <td>{item.caracter_academico}</td>
                                                    <td>{item.ubicacion}</td>
                                                    <td>{item.acreditado}</td>
                                                    <td>{item.jornada}</td>
                                                    <td>{item.numero_semestres}</td>
                                                    <td>{item.metodologia}</td>
                                                    <td>
                                                        <button className='btn btn-sm mx-1 btn-danger' onClick={() => handleDeleteOffer(item)}>Eliminar</button>
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
        </div>
    )
}
