import { auth } from "../firebase"; // Importe apenas do firebase.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErro("");
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (error) {
      console.error(error.code);
      setErro("Usuário não cadastrado ou senha incorreta.");
    }
  };

  const inputStyle = "w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl text-center">
        <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2 block">Ze da Manga</span>
        <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo</h2>
        <p className="mb-8 text-slate-400">Faça login para acessar sua conta.</p>

        {erro && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">{erro}</div>}

        <div className="space-y-4">
          <input type="email" placeholder="seu@email.com" className={inputStyle} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="••••••" className={inputStyle} onChange={e => setSenha(e.target.value)} />
          <button onClick={handleLogin} className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98]">
            Acessar Painel
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Ainda não tem acesso? <Link to="/cadastro" className="text-orange-500 hover:text-orange-400 font-medium">Criar conta agora</Link>
        </p>
      </div>
    </div>
  );
}
