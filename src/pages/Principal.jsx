import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Principal() {
  const navigate = useNavigate()
  const [usuario,    setUsuario]    = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Escuta o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Não está logado — redireciona para login
        navigate('/login')
        return
      }

      // Busca os dados do Firestore pelo UID
      const snap = await getDoc(doc(db, 'usuarios', user.uid))
      if (snap.exists()) {
        setUsuario(snap.data())
      }
      setCarregando(false)
    })

    return () => unsubscribe()
  }, [navigate])

  async function handleLogout() {
    await signOut(auth)
    navigate('/login')
  }

  function formatarData(data) {
    if (!data) return '—'
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  if (carregando) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <p className="subtitle">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="logo-row">
        <div className="logo-mark">OI</div>
        <div>
          <h1>Bem-vindo!</h1>
          <p className="subtitle">Página principal</p>
        </div>
      </div>

      <div className="divider" />

      {usuario && (
        <div className="dados-usuario">
          <div className="dado-item">
            <span className="dado-label">Nome</span>
            <span className="dado-valor">{usuario.nome}</span>
          </div>
          <div className="dado-item">
            <span className="dado-label">Sobrenome</span>
            <span className="dado-valor">{usuario.sobrenome}</span>
          </div>
          <div className="dado-item">
            <span className="dado-label">Data de Nascimento</span>
            <span className="dado-valor">{formatarData(usuario.dataNascimento)}</span>
          </div>
          <div className="dado-item">
            <span className="dado-label">E-mail</span>
            <span className="dado-valor">{usuario.email}</span>
          </div>
        </div>
      )}

      <button onClick={handleLogout} style={{ marginTop: '24px' }}>
        Sair
      </button>
    </div>
  )
}
