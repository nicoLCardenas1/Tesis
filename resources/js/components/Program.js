import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetHttpRequest } from './https/GetHttpRequest';
import Swal from 'sweetalert2'

export const Program = () => {
    let { id } = useParams();
    const [offer, setOffer] = useState(null)
    const user = useSelector(state => state.auth)

    useEffect(() => {
        console.log('cambio el parametro id:' + id)
        getDataOffer()
    }, [id])

    const getDataOffer = async () => {
        const data = {
            route: `/api/offer/`,
            parametro: id,
        };
        const request = await GetHttpRequest(data)
        setOffer(request);
    }

    const handleSaveFavorite = async (offer) => {
        offer.user_id = parseInt(user?.user_id)
        try {
            const response = await fetch(`/api/save/favorite`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify(offer)
            });
            const data = await response.json();
            console.log('******||favorite', data)
            //dispatch(offers())
            if (data.status) {
                Swal.fire({
                    title: 'Muy Bien!',
                    text: 'Añadido en los favoritos',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })
            } else {
                Swal.fire({
                    title: 'Upps!',
                    text: 'Ya tienes esta oferta en tus favoritos',
                    icon: 'info',
                    confirmButtonText: 'Cerrar'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-6 card p-4 mt-4'>
                    <button
                        type='button'
                        className='btn btn-sm mb-3'
                        style={{ fontSize: '30px' }}
                        onClick={() => handleSaveFavorite(offer)}
                    >
                        ❤
                    </button>
                    <h5>Oferta {offer?.nombre_programa ? offer?.nombre_programa : 'Cargando...'}</h5><hr />
                    <p>{`Codigo Snies: ${offer?.codigo_snies ? offer?.codigo_snies : 'Cargando...'}`}</p>
                    <p>{`Nombre de programa: ${offer?.nombre_programa ? offer?.nombre_programa : 'Cargando...'}`}</p>
                    <p>{`Sector Academico: ${offer?.sector_academico ? offer?.sector_academico : 'Cargando...'}`}</p>
                    <p>{`Caracter Academico: ${offer?.caracter_academico ? offer?.caracter_academico : 'Cargando...'}`}</p>
                    <p>{`Ubicación: ${offer?.ubicacion ? offer?.ubicacion : 'Cargando...'}`}</p>
                    <p>{`Acreditado: ${offer?.acreditado ? offer?.acreditado : 'Cargando...'}`}</p>
                    <p>{`Jornada: ${offer?.jornada ? offer?.jornada : 'Cargando...'}`}</p>
                    <p>{`Número de semestres: ${offer?.numero_semestres ? offer?.numero_semestres : 'Cargando...'}`}</p>
                    <p>{`Metodología: ${offer?.metodologia ? offer?.metodologia : 'Cargando...'}`}</p>
                </div>
            </div>
        </div>
    )
}
