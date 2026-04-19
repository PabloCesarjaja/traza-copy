import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Le pegamos al API Gateway (Puerto 3000), no directamente al Auth Service
      const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse('Error de conexión con el API Gateway');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>TRAZA-Legal: Prueba de Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '1rem' }}>
        <input 
          type="email" placeholder="Correo" 
          value={email} onChange={e => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Contraseña" 
          value={password} onChange={e => setPassword(e.target.value)} required 
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <pre style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
        {response || 'Esperando respuesta del servidor...'}
      </pre>
    </div>
  );
}