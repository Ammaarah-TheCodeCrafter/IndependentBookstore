import { useState } from 'react';

export default function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage('Passwords do not match.');
            return;
        }

        try{
            const response = await fetch('https://independentbookstore-api.onrender.com/api/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch {
            setMessage('Could not connect to the server.');
        }
    }

    return (
        <section className='mx-auto max-w-md p-5'>
            <h2 className='mb-4 text-4x1 font-bold'>Create an Account</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <p>Name</p>
                 <input
                    type='text'
                    placeholder='Full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full rounded border p-2.5'
                />
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
                <p>Confirm Password</p>
                 <input
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='w-full rounded border p-2.5'
                />

                <button 
                    type='submit'
                    className='rounded bg-clay px-5 py-2.5 text-white'>
                        Sign Up
                </button>
                
            </form>

            {message && <p className='mt-4'>{message}</p>}

            <p className='mt-4 text-center'>Already have an account? <a href="/Login" className='font-semibold underline'> Login </a></p>

        </section>
    );
}