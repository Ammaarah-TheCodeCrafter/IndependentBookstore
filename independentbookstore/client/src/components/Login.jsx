import { useState, useEffect } from 'react';

export default function Login(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://independentbookstore-api.onrender.com/api/me',
            {
                credentials: 'include',
            }
        ).then((response) => {
            if (!response.ok) return null;
            return response.json();
        }).then((data) => {
            if (data) setUser(data.user);
        })
        .catch(() => {});
    },[]);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            const response = await fetch('https://independentbookstore-api.onrender.com/api/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok){
                window.location.href = '/';
            }
        } catch {
            setMessage('Could not connect to the server.');
        }
    }

    return (
        <section className='mx-auto max-w-md p-5'>
            <h2 className='text-4x1 font-bold'>Login</h2>

            {user && (
                <p className='mb-4'>You're logged in as {user.name}!</p>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
                <p>Email</p>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full rounded border p-2.5'
                />
                <p>Password</p>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full rounded border p-2.5'
                />
               
                <button 
                    type='submit'
                    className='rounded bg-clay px-5 py-2.5 text-white'>
                        Login
                </button>
                
            </form>

            {message && <p className='mt-4'>{message}</p>}
            <p className='mt-4 text-center'>Don't have an account? {' '}
                <a href="/signup" className='font-semibold underline'> Create one </a>
            </p>

        </section>
    );
}