import React, { useState } from 'react'
import styled from "styled-components";

const Title = styled.h3`
    background: lightblue;
    width: 30%;
    color: black;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const Simulate = () => {
    const [monto, setMonto] = useState(0)
    const [tasa, setTasa] = useState(0.0128)
    const [plazo, setPlazo] = useState(48)
    const [total, setTotal] = useState(0)
    const [typePayment, setTypePayment] = useState('credito')

    const handleSimulate = (e) => {
        e.preventDefault();
        console.log('sii')
        setTotal(monto * tasa/(1-Math.pow((1+tasa),-plazo)));    }

    return (
        <div className='container-fluid m-0 p-0'>
            <Title className='text-center'>Simulador de creditos</Title>
            <div className='row justify-content-center'>
                <div className='col-md-4'>
                    <form className='card p-4' onSubmit={handleSimulate}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Monto del crédito</label>
                            <input type="number" className="form-control" onChange={(e) => setMonto(e.target.value)} value={monto} placeholder="0" />
                        </div>
                      
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Plazo</label>
                            <select className="form-control" defaultValue={48} onChange={(e) => setPlazo(e.target.value)}>
                                <option value={3}>3 Meses</option>
                                <option value={6}>6 Meses</option>
                                <option value={12}>12 Meses</option>
                                <option value={24}>24 Meses</option>
                                <option value={36}>36 Meses</option>
                                <option value={48}>48 Meses</option>
                                <option value={60}>60 Meses</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button className='btn btn-primary btn-sm btn-block'>Simular Crédito</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <div className='card p-4'>
                        <h6>Resumen del Crédito</h6><hr />
                        Monto crédito: {monto} <br />
                        Tasa: {tasa} <br />
                        Total: {total} <br />
                        Forma de pago: {typePayment} <br />
                        Plazo: {plazo} Meses<br />
                    </div>
                </div>
            </div>
        </div>
    )
}
