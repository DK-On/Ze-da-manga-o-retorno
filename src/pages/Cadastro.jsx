import { auth, db } from "../firebase"; 
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {
  const [formData, setFormData] = useState({ email: "", senha: "", nome: "", sobrenome: "", dataNascimento: "" });
  const [status, setStatus] = useState({ carregando: false, sucesso: false });
  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      setStatus({ carregando: true, sucesso: false });
      
      // 1. Cria a conta no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      
      // 2. Salva os dados detalhados no Firestore
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nome: formData.nome, 
        sobrenome: formData.sobrenome, 
        dataNascimento: formData.dataNascimento, 
        uid: userCredential.user.uid,
        email: formData.email
      });

      // 3. Ativa o estado de sucesso (cor verde)
      setStatus({ carregando: false, sucesso: true });

      // 4. Aguarda 2 segundos para o usuário ver a validação e redireciona para o Login
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus({ carregando: false, sucesso: false });
      alert("Erro ao cadastrar. Verifique se o e-mail é válido e a senha tem 6+ caracteres.");
    }
  };

  const inputStyle = "w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all disabled:opacity-50";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Nova Conta</h2>
        <p className="mb-8 text-slate-400">Preencha seus dados para registrar.</p>

        {/* Alerta Verde de Validação */}
        {status.sucesso && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-sm font-medium animate-pulse flex items-center gap-2">
            <span className="text-lg">✓</span> Cadastro realizado! Validando dados...
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nome" 
              className={inputStyle}
              disabled={status.carregando || status.sucesso}
              onChange={e => setFormData({...formData, nome: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Sobrenome" 
              className={inputStyle}
              disabled={status.carregando || status.sucesso}
              onChange={e => setFormData({...formData, sobrenome: e.target.value})} 
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 ml-1">Data de Nascimento</label>
            <input 
              type="date" 
              className={`${inputStyle} font-sans text-slate-400`} 
              disabled={status.carregando || status.sucesso}
              onChange={e => setFormData({...formData, dataNascimento: e.target.value})} 
            />
          </div>

          <input 
            type="email" 
            placeholder="E-mail" 
            className={inputStyle}
            disabled={status.carregando || status.sucesso}
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className={inputStyle}
            disabled={status.carregando || status.sucesso}
            onChange={e => setFormData({...formData, senha: e.target.value})} 
          />
          
          <button 
            onClick={handleCadastro} 
            disabled={status.carregando || status.sucesso}
            className="w-full mt-4 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98]"
          >
            {status.carregando ? "Processando..." : status.sucesso ? "Redirecionando..." : "Finalizar Cadastro"}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Já possui conta? <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}
