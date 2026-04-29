import { auth, db } from "../firebase"; 
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErro("");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (error) {
      setErro("Usuário não cadastrado ou senha incorreta.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2 font-mono">Ze da Manga</h1>
          <h2 className="text-4xl font-bold text-white tracking-tight">Bem-vindo</h2>
          <p className="mt-2 text-slate-400">Faça login para acessar sua conta.</p>
        </header>

        {erro && <div className="mb-6 bg-red-950/50 border border-red-800 text-red-300 text-sm p-4 rounded-xl font-medium">{erro}</div>}

        <div className="space-y-5">
          <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
          
          <button onClick={handleLogin} className="mt-2">Acessar Painel</button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Ainda não tem acesso? <Link to="/cadastro" className="text-orange-500 hover:text-orange-400">Criar conta agora</Link>
        </p>
      </div>
    </div>
  );
}
