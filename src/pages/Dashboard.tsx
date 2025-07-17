import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { LogOut } from 'lucide-react';

import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

export default function Dashboard() {
    const navigate = useNavigate();

    const reload = () => window.location.reload();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout',
            // Removed background and color
        });

        if (result.isConfirmed) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };


    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>

            <StudentForm onAdd={reload} />
            <StudentList />
        </div>
    );
}
