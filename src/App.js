import React, { useState } from 'react'
import './App.css'

function App() {
  const [partidos] = useState([
    { id: 1, local: { nombre: 'Argentina', bandera: '🇦🇷' }, visitante: { nombre: 'Brasil', bandera: '🇧🇷' }, fecha: '2024-07-01 18:00', estado: 'finalizado', resultado_local: 2, resultado_visitante: 1, cuotas: { local: 2.1, empate: 3.2, visitante: 3.5 } },
    { id: 2, local: { nombre: 'Francia', bandera: '🇫🇷' }, visitante: { nombre: 'Alemania', bandera: '🇩🇪' }, fecha: '2024-07-02 20:00', estado: 'en_vivo', resultado_local: 1, resultado_visitante: 1, cuotas: { local: 1.9, empate: 3.0, visitante: 3.8 } },
    { id: 3, local: { nombre: 'España', bandera: '🇪🇸' }, visitante: { nombre: 'Italia', bandera: '🇮🇹' }, fecha: '2024-07-03 15:00', estado: 'programado', resultado_local: null, resultado_visitante: null, cuotas: { local: 2.2, empate: 3.1, visitante: 3.3 } },
    { id: 4, local: { nombre: 'Holanda', bandera: '🇳🇱' }, visitante: { nombre: 'Portugal', bandera: '🇵🇹' }, fecha: '2024-07-04 19:30', estado: 'programado', resultado_local: null, resultado_visitante: null, cuotas: { local: 2.0, empate: 3.3, visitante: 3.6 } },
    { id: 5, local: { nombre: 'Bélgica', bandera: '🇧🇪' }, visitante: { nombre: 'Uruguay', bandera: '🇺🇾' }, fecha: '2024-07-05 17:00', estado: 'finalizado', resultado_local: 3, resultado_visitante: 0, cuotas: { local: 1.8, empate: 3.4, visitante: 4.2 } },
    { id: 6, local: { nombre: 'Argentina', bandera: '🇦🇷' }, visitante: { nombre: 'Francia', bandera: '🇫🇷' }, fecha: '2024-07-06 20:00', estado: 'programado', resultado_local: null, resultado_visitante: null, cuotas: { local: 2.3, empate: 3.0, visitante: 3.2 } },
    { id: 7, local: { nombre: 'Brasil', bandera: '🇧🇷' }, visitante: { nombre: 'Alemania', bandera: '🇩🇪' }, fecha: '2024-07-07 18:30', estado: 'finalizado', resultado_local: 0, resultado_visitante: 2, cuotas: { local: 1.7, empate: 3.5, visitante: 4.5 } },
    { id: 8, local: { nombre: 'España', bandera: '🇪🇸' }, visitante: { nombre: 'Holanda', bandera: '🇳🇱' }, fecha: '2024-07-08 19:00', estado: 'en_vivo', resultado_local: 1, resultado_visitante: 0, cuotas: { local: 2.15, empate: 3.25, visitante: 3.45 } },
    { id: 9, local: { nombre: 'Italia', bandera: '🇮🇹' }, visitante: { nombre: 'Bélgica', bandera: '🇧🇪' }, fecha: '2024-07-09 15:30', estado: 'programado', resultado_local: null, resultado_visitante: null, cuotas: { local: 2.05, empate: 3.15, visitante: 3.75 } },
    { id: 10, local: { nombre: 'Uruguay', bandera: '🇺🇾' }, visitante: { nombre: 'Argentina', bandera: '🇦🇷' }, fecha: '2024-07-10 20:00', estado: 'programado', resultado_local: null, resultado_visitante: null, cuotas: { local: 3.2, empate: 3.1, visitante: 2.1 } },
  ])

  const [saldo, setSaldo] = useState(1000)
  const [apuestas, setApuestas] = useState([])
  const [modal, setModal] = useState(null)
  const [monto, setMonto] = useState('')

  const abrirModal = (partido, tipo) => {
    setModal({ partido, tipo })
    setMonto('')
  }

  const cerrarModal = () => {
    setModal(null)
  }

  const hacerApuesta = () => {
    if (!monto || monto <= 0) {
      alert('Ingresa un monto válido')
      return
    }

    if (monto > saldo) {
      alert('No tenés saldo suficiente')
      return
    }

    const nuevoSaldo = saldo - monto
    setSaldo(nuevoSaldo)

    const cuota = modal.tipo === 'local' ? modal.partido.cuotas.local : 
                  modal.tipo === 'empate' ? modal.partido.cuotas.empate : 
                  modal.partido.cuotas.visitante

    const nuevaApuesta = {
      id: apuestas.length + 1,
      partido: `${modal.partido.local.nombre} vs ${modal.partido.visitante.nombre}`,
      tipo: modal.tipo,
      monto: parseFloat(monto),
      cuota: cuota,
      ganancia_potencial: parseFloat(monto) * cuota,
      fecha: new Date().toLocaleString()
    }

    setApuestas([nuevaApuesta, ...apuestas])
    cerrarModal()
  }

  return (
    <div className="App">
      <div className="header">
        <h1>⚽ App de Apuestas</h1>
        <div className="saldo-box">
          <p>Saldo: ${saldo.toFixed(2)}</p>
        </div>
      </div>

      <div className="container">
        <div className="partidos-section">
          <h2>Partidos</h2>
          <div className="partidos-list">
            {partidos.map(p => (
              <div key={p.id} className="partido-card">
                <p className="fecha">{new Date(p.fecha).toLocaleDateString()}</p>
                
                <div className="partido">
                  <span className="equipo">{p.local.bandera} {p.local.nombre}</span>
                  
                  {p.estado === 'finalizado' ? (
                    <span className="resultado">
                      {p.resultado_local} - {p.resultado_visitante}
                    </span>
                  ) : p.estado === 'en_vivo' ? (
                    <span className="en-vivo">EN VIVO</span>
                  ) : (
                    <span className="vs">vs</span>
                  )}
                  
                  <span className="equipo">{p.visitante.bandera} {p.visitante.nombre}</span>
                </div>

                {p.estado !== 'finalizado' && (
                  <div className="cuotas">
                    <button className="cuota-btn" onClick={() => abrirModal(p, 'local')}>
                      {p.local.nombre} {p.cuotas.local}
                    </button>
                    <button className="cuota-btn" onClick={() => abrirModal(p, 'empate')}>
                      Empate {p.cuotas.empate}
                    </button>
                    <button className="cuota-btn" onClick={() => abrirModal(p, 'visitante')}>
                      {p.visitante.nombre} {p.cuotas.visitante}
                    </button>
                  </div>
                )}
                
                <p className="estado">{p.estado}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="apuestas-section">
          <h2>Mis Apuestas ({apuestas.length})</h2>
          <div className="apuestas-list">
            {apuestas.length === 0 ? (
              <p className="sin-apuestas">Todavía no hiciste apuestas</p>
            ) : (
              apuestas.map(a => (
                <div key={a.id} className="apuesta-card">
                  <p className="apuesta-partido">{a.partido}</p>
                  <p className="apuesta-tipo">Tipo: <strong>{a.tipo}</strong></p>
                  <p className="apuesta-datos">Monto: ${a.monto.toFixed(2)} × {a.cuota}</p>
                  <p className="apuesta-ganancia">Ganancia potencial: ${a.ganancia_potencial.toFixed(2)}</p>
                  <p className="apuesta-fecha">{a.fecha}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Apostar en {modal.partido.local.nombre} vs {modal.partido.visitante.nombre}</h3>
            <p className="modal-tipo">Tipo: <strong>{modal.tipo}</strong></p>
            <p className="modal-cuota">Cuota: <strong>{modal.tipo === 'local' ? modal.partido.cuotas.local : modal.tipo === 'empate' ? modal.partido.cuotas.empate : modal.partido.cuotas.visitante}</strong></p>
            
            <input 
              type="number" 
              placeholder="Monto a apostar" 
              value={monto} 
              onChange={e => setMonto(e.target.value)}
              min="1"
            />
            
            {monto && (
              <p className="ganancia-preview">
                Si ganás: ${(parseFloat(monto) * (modal.tipo === 'local' ? modal.partido.cuotas.local : modal.tipo === 'empate' ? modal.partido.cuotas.empate : modal.partido.cuotas.visitante)).toFixed(2)}
              </p>
            )}

            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="btn-apostar" onClick={hacerApuesta}>Apostar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App