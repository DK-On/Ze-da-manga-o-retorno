import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Cadastro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email:          '',
    senha:          '',
    nome:           '',
    sobrenome:      '',
    dataNascimento: '',
  })
  const [erro,      setErro]      = useState('')
  const [sucesso,   setSucesso]   = useState(false)
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErro('')
  }

  async function handleCadastro() {
    const { email, senha, nome, sobrenome, dataNascimento } = form

    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      setErro('Preencha todos os campos.')
      return
    }

    setCarregando(true)
    try {
      // 1. Cria o usuário no Firebase Authentication
      const credencial = await createUserWithEmailAndPassword(auth, email, senha)
      const uid = credencial.user.uid

      // 2. Grava os dados adicionais no Firestore com o UID como ID do documento
      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
        criadoEm: new Date().toISOString(),
      })

      setSucesso(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      const mensagens = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/weak-password':        'A senha deve ter pelo menos 6 caracteres.',
        'auth/invalid-email':        'E-mail inválido.',
      }
      setErro(mensagens[err.code] || 'Erro ao cadastrar. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="card">
      <div className="logo-row">
        <div className="logo-mark">CA</div>
        <div>
          <h1>Cadastro</h1>
          <p className="subtitle">Crie sua conta</p>
        </div>
      </div>

      <div className="divider" />

      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          id="sobrenome"
          name="sobrenome"
          type="text"
          placeholder="Seu sobrenome"
          value={form.sobrenome}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input
          id="dataNascimento"
          name="dataNascimento"
          type="date"
          value={form.dataNascimento}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={form.senha}
          onChange={handleChange}
        />
      </div>

      {erro    && <div className="feedback error">{erro}</div>}
      {sucesso && <div className="feedback success">Cadastro realizado! Redirecionando...</div>}

      <button onClick={handleCadastro} disabled={carregando}>
        {carregando ? 'Cadastrando...' : 'Cadastrar'}
      </button>

      <p className="link-texto">
        Já tem conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  )
}
