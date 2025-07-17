import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { UserPlus, LogIn } from 'lucide-react';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { username, password });
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful',
                text: 'You can now login with your credentials.',
            });
            navigate('/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: 'Username may already be taken or server error.',
            });
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSignup}
                className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    className="w-full border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center justify-center gap-2"
                >
                    <UserPlus className="w-5 h-5"/>
                    Signup
                </button>

                <div className="text-center">
                    <p className="text-gray-600">Already have an account?</p>
                    <button
                        type="button"
                        onClick={goToLogin}
                        className="mt-2 inline-flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <LogIn className="w-4 h-4"/>
                        Go to Login
                    </button>
                </div>
            </form>
        </div>
            );
            }
