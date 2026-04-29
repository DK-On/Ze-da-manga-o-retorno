import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {
  const [formData, setFormData] = useState({ email: "", senha: "", nome: "", sobrenome: "", dataNascimento: "" });
  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nome: formData.nome, sobrenome: formData.sobrenome, dataNascimento: formData.dataNascimento, uid: userCredential.user.uid
      });
      alert("Conta criada com sucesso!");
      navigate("/principal");
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Nova Conta</h2>
        <p className="mb-8 text-slate-400">Preencha seus dados para registrar.</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nome" onChange={e => setFormData({...formData, nome: e.target.value})} />
            <input type="text" placeholder="Sobrenome" onChange={e => setFormData({...formData, sobrenome: e.target.value})} />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 ml-1">Data de Nascimento</label>
            <input type="date" className="w-full font-sans text-slate-400" onChange={e => setFormData({...formData, dataNascimento: e.target.value})} />
          </div>

          <input type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Senha" onChange={e => setFormData({...formData, senha: e.target.value})} />
          
          <button onClick={handleCadastro} className="mt-4">Finalizar Cadastro</button>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">Já possui conta? <Link to="/" className="text-orange-500 hover:text-orange-400">Fazer login</Link></p>
      </div>
    </div>
  );
}
