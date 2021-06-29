import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetHttpRequest } from './https/GetHttpRequest';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";

export const Universidad = () => {
    let { id } = useParams();
    const [offer, setOffer] = useState(null)
    const history = useHistory();

    useEffect(() => {
        console.log('cambio el parametro id:' + id)
        getDataOffer()
    }, [id])

    const getDataOffer = async () => {
        const data = {
            route: `/api/universidad/`,
            parametro: id,
        };
        const request = await GetHttpRequest(data);
        if (Object.keys(request).length === 0) {
            history.goBack();
        }
        setOffer(request);
    }
    console.log(offer)
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-6 card p-4 mt-4'>
                    <img src={offer?.urlFoto} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{offer?.nombreIes}</h5>
                        <span className="card-title">{offer?.descripcion}</span>
                        <div className="my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin p-2" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="11" r="3" />
                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                            <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURI(offer?.ubicacion)} target="_blank"><span className="card-title">{offer?.ubicacion}</span></a>
                            <br></br>
                           <br></br>
                            <span className="card-title">Sector: {offer?.sector}</span>
                            <br></br> 
                            <span className="card-title">Caracter Academico: {offer?.caracterAcademico}</span> </div>
                        <a href={offer?.urlPagina} target="_blank" className="btn btn-primary">Abrir página</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
