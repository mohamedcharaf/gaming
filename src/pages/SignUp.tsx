// src/pages/Signup.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);
  const [infoMsg, setInfoMsg]     = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate                  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (password !== confirm) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setInfoMsg("Inscription réussie ! Vérifiez votre boîte mail.");
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">S’inscrire</h2>

      {errorMsg && (
        <p className="text-sm text-red-400 mb-4">{errorMsg}</p>
      )}
      {infoMsg && (
        <p className="text-sm text-green-400 mb-4">{infoMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Confirmation */}
        <div>
          <label htmlFor="confirm" className="block mb-1 text-sm font-medium">
            Confirmez le mot de passe
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 mt-4 font-semibold rounded
            ${isSubmitting
              ? 'bg-indigo-700 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500'}
            text-white transition`}
        >
          {isSubmitting ? 'Inscription…' : 'S’inscrire'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Déjà inscrit ?{' '}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
