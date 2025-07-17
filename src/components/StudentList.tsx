import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Student } from '../types';

export default function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [grade, setGrade] = useState('');

    const loadStudents = async () => {
        const res = await api.get('/students');
        setStudents(res.data);
    };

    const deleteStudent = async (id: number) => {
        await api.delete(`/students/${id}`);
        loadStudents();
    };

    const startEdit = (student: Student) => {
        setEditingStudent(student);
        setName(student.name);
        setAge(student.age);
        setGrade(student.grade);
    };

    const cancelEdit = () => {
        setEditingStudent(null);
        setName('');
        setAge('');
        setGrade('');
    };

    const updateStudent = async () => {
        if (!editingStudent) return;

        await api.put(`/students/${editingStudent.id}`, {
            name,
            age,
            grade,
        });

        cancelEdit();
        loadStudents();
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">All Students</h3>

            <ul className="space-y-3">
                {students.map((s) => (
                    <li
                        key={s.id}
                        className="flex justify-between items-center border-b pb-2"
                    >
                        <span>{s.name} ({s.age} yrs) - Grade {s.grade}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => startEdit(s)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-500"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => deleteStudent(s.id!)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingStudent && (
                <div className="mt-6 p-4 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-2">Edit Student</h4>
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            placeholder="Age"
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            placeholder="Grade"
                            className="w-full border px-3 py-2 rounded"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={updateStudent}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
