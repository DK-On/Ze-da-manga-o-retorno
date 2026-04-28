import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const navigate = useNavigate()

  const [email,      setEmail]      = useState('')
  const [senha,      setSenha]      = useState('')
  const [erro,       setErro]       = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }

    setCarregando(true)
    setErro('')
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      navigate('/principal')
    } catch (err) {
      const mensagens = {
        'auth/user-not-found':   'Usuário não está cadastrado.',
        'auth/wrong-password':   'Usuário não está cadastrado.',
        'auth/invalid-email':    'E-mail inválido.',
        'auth/invalid-credential': 'Usuário não está cadastrado.',
      }
      setErro(mensagens[err.code] || 'Usuário não está cadastrado.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="card">
      <div className="logo-row">
        <div className="logo-mark">LG</div>
        <div>
          <h1>Login</h1>
          <p className="subtitle">Acesse sua conta</p>
        </div>
      </div>

      <div className="divider" />

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErro('') }}
        />
      </div>

      <div className="field">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={e => { setSenha(e.target.value); setErro('') }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
      </div>

      {erro && <div className="feedback error">{erro}</div>}

      <button onClick={handleLogin} disabled={carregando}>
        {carregando ? 'Acessando...' : 'Acessar'}
      </button>

      <p className="link-texto">
        Não tem conta? <Link to="/cadastro">Cadastrar-se</Link>
      </p>
    </div>
  )
}
