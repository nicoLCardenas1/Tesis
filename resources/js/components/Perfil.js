import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';

export const Perfil = () => {
    const [urlFoto, setUrlPhoto] = useState('');
    const [nombreIes, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [caracterAcademico, setCaracterAcademico] = useState('');
    const [sector, setSector] = useState('');
    const [urlPagina, setUrlPagina] = useState('');
    const user = useSelector(state => state.auth);

    useEffect(() => {
        if (user.user_id) {
            fetch(`/api/universidad-user/${user.user_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                }
            })
                .then(data => data.json())
                .then(data => {
                    setNombre(user.snies ?? '');
                    setUrlPhoto(data.urlFoto ?? '');
                    setDescripcion(data.descripcion ?? '');
                    setUbicacion(data.ubicacion ?? '');
                    setUrlPagina(data.urlPagina ?? '');
                    setSector(data.sector ?? '');
                    setCaracterAcademico(data.caracterAcademico ?? '');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [user]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!urlFoto || !nombreIes || !descripcion || !ubicacion || !urlPagina || !sector || !caracterAcademico) {
            Swal.fire({
                title: 'Incompletos',
                text: 'Todos los campos son requeridos',
                icon: 'error',
                timer: 2000,
                confirmButtonText: 'Cerrar'
            });
        } else {
            fetch(`/api/universidad`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify({
                    urlFoto, nombreIes, descripcion, ubicacion, urlPagina, idUser: user.user_id, sector, caracterAcademico
                })
            })
                .then(data => data.json())
                .then(data => {
                    if (data.status) {
                        Swal.fire({
                            title: 'Perfil actualizado',
                            text: 'La información del perfil de la universidad se ha modificado.',
                            icon: 'success',
                            confirmButtonText: 'Cerrar',
                            timer: 5000
                        });
                        user.sector = sector;
                        user.caracterAcademico = caracterAcademico;
                    } else {
                        Swal.fire({
                            title: 'Upps!',
                            text: 'Se ha presentado un error, intente nuevamente',
                            icon: 'error',
                            confirmButtonText: 'Cerrar'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    <h4 className='text-primary'>Editar perfil universidad</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="urlFoto">URL foto</label>
                            <input type="text" className="form-control" id="urlFoto" placeholder="URL imagen de la universidad" onChange={(e) => setUrlPhoto(e.target.value)} value={urlFoto} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre universidad</label>
                            <input type="text" disabled className="form-control" id="nombre" value={nombreIes} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea className="form-control" id="descripcion" placeholder="Agregar descripción de la universidad." rows="3" onChange={(e) => setDescripcion(e.target.value)} value={descripcion}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ubicacion">Ubicación</label>
                            <input type="text" className="form-control" id="ubicacion" placeholder="Carrera 9 - 45A" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pagina">URL página</label>
                            <input type="text" className="form-control" id="pagina" placeholder="www.unal.edu.co" onChange={(e) => setUrlPagina(e.target.value)} value={urlPagina} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sector">Sector</label>
                            <select className="custom-select custom-select-sm" value={sector ? sector : 'DEFAULT'} onChange={(e) => setSector(e.target.value)}>
                                <option value="DEFAULT" required disabled>Tipo de sector</option>
                                <option value="Diurna">Público</option>
                                <option value="Nocturna">Privado</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="caracterAcademico">Caracter academico</label>
                            <select className="custom-select custom-select-sm" value={caracterAcademico ? caracterAcademico : 'DEFAULT'} onChange={(e) => setCaracterAcademico(e.target.value)}>
                                <option value="DEFAULT" required disabled>Tipo de caracter academico</option>
                                <option value="Institución técnica profesional">Institución técnica profesional</option>
                                <option value="Institución tecnológica">Institución tecnológica</option>
                                <option value="Institución universitario">Institución universitario</option>
                                <option value="Universidad">Universidad</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handlerSubmit}>Actualizar información</button>
                    </form>
                </div>
            </div>
        </div>
    )
}