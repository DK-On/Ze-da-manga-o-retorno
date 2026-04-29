import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Principal() {
  const [dados, setDados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docSnap = await getDoc(doc(db, "usuarios", user.uid));
        if (docSnap.exists()) setDados(docSnap.data());
      } else {
        navigate("/"); // Redireciona para o login se não estiver logado
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Header Profissional */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-orange-600 rounded-full flex items-center justify-center font-bold text-xl text-white">Z</div>
          <h1 className="text-2xl font-bold tracking-tight">Painel Principal</h1>
        </div>
        <button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 w-auto px-5 py-2.5 text-sm font-medium">Sair</button>
      </header>

      {/* Conteúdo Centralizado */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
          {dados ? (
            <div className="space-y-8">
              <header className="flex items-center gap-5 border-b border-slate-800 pb-8">
                <div className="size-24 bg-slate-800 rounded-full flex items-center justify-center font-bold text-5xl text-orange-500 uppercase font-mono border-4 border-slate-700">
                  {dados.nome.substring(0, 1)}{dados.sobrenome.substring(0, 1)}
                </div>
                <div>
                  <h3 className="text-slate-500 font-medium font-mono text-sm uppercase">Perfil do Usuário</h3>
                  <p className="text-4xl font-extrabold tracking-tight text-white">{dados.nome} {dados.sobrenome}</p>
                  <p className="text-slate-400 mt-1">{auth.currentUser?.email}</p>
                </div>
              </header>

              <div className="grid grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <DataField label="Nome Completo" value={`${dados.nome} ${dados.sobrenome}`} />
                <DataField label="Identificador (UID)" value={dados.uid} mono />
                <DataField label="Data de Nascimento" value={dados.dataNascimento} />
                <DataField label="Status da Conta" value="Ativo" />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">Carregando informações...</div>
          )}
        </div>
      </main>
    </div>
  );
}

// Componente auxiliar para exibir dados limpos
function DataField({ label, value, mono }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <p className={`text-white font-medium ${mono ? 'font-mono text-xs bg-slate-900 p-1.5 rounded' : 'text-lg'}`}>{value}</p>
    </div>
  );
}
