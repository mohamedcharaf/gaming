// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [errorMsg, setErrorMsg]     = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate                    = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Redirige vers l’espace admin (ou n’importe quelle autre page protégée)
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '4rem auto',
      padding: '2rem',
      border: '1px solid #333',
      borderRadius: 8,
      backgroundColor: '#0d0d0d',
      color: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Connexion
      </h2>

      {errorMsg && (
        <p style={{ color: 'salmon', marginBottom: '1rem' }}>
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 4,
              border: '1px solid #555',
              backgroundColor: '#1a1a1a',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 4,
              border: '1px solid #555',
              backgroundColor: '#1a1a1a',
              color: '#fff'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#6366f1',
            color: '#fff',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.9rem'
      }}>
        <Link to="/signup" style={{ color: '#8b5cf6' }}>
          S’inscrire
        </Link>
        <Link to="/reset-password" style={{ color: '#8b5cf6' }}>
          Mot de passe oublié ?
        </Link>
      </div>
    </div>
  );
}
