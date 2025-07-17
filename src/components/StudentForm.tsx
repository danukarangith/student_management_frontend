import { useState } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function StudentForm({ onAdd }: { onAdd: () => void }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>(0);
    const [grade, setGrade] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/students', { name, age, grade });
            Swal.fire({
                icon: 'success',
                title: 'Student added!',
                text: `${name} has been added successfully.`,
                confirmButtonColor: '#3085d6',
            });

            onAdd();
            setName('');
            setAge(0);
            setGrade('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add student.',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Add Student</h3>
            <div className="flex gap-2">
                <input
                    className="border p-2 rounded w-full"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    className="border p-2 rounded w-20"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(+e.target.value)}
                    required
                />
                <input
                    className="border p-2 rounded w-24"
                    placeholder="Grade"
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    required
                />
                <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700" type="submit">
                    Add
                </button>
            </div>
        </form>
    );
}
