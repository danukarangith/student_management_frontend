import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password',
            });
        }
    };

    const goToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="max-w-md w-full bg-white p-6 rounded-lg shadow space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                <input
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input
                    className="w-full border p-2 rounded mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex justify-center items-center gap-2"
                >
                    <LogIn className="w-5 h-5" />
                    Login
                </button>

                <div className="text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        type="button"
                        onClick={goToSignUp}
                        className="mt-2 inline-flex items-center gap-2 text-purple-600 hover:underline"
                    >
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}
