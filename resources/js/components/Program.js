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
        /**
         * La variable request tiene toda la información de la oferta, por lo cual puedes agregar una vista para el programa.
         */
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
    console.log(offer)
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-6 card p-4 mt-4'>
                <h2 className="card-title">{offer?.nombre_programa}</h2>
                    <img src={offer?.url_programa} className="card-img-top" alt="..." />
                    <br></br>
                    <div className="card-body">
                    <span className="card-title">{offer?.descripcion}</span>
                    
                        <div className="my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin p-2" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            <span className="card-title">{offer?.ubicacion}</span>
                            <br></br>
                            <span className="card-title">Valor Semestre: {offer?.precio}</span>
                            <br></br> 
                            <span className="card-title">Titulo Otorgado: {offer?.titulo_otorgado}</span> </div>
                            <span className="card-title">Nivel Academico: {offer?.nivel_academico}</span>
                            <br></br>
                            <span className="card-title">Metodologia: {offer?.metodologia}</span>
                            <br></br>
                            <span className="card-title">Jornada: {offer?.jornada}</span>
                            <br></br>
                            <br></br>
                        <a href={offer?.pagina_admision} target="_blank" className="btn btn-dark">Página de Admisiones</a>
                        <br></br>
                       
                        <a href={offer?.pagina_plan} target="_blank" className="btn btn-primary">Ver plan de estudios</a>

                    </div>
                </div>
            </div>
        </div>
    )
    }