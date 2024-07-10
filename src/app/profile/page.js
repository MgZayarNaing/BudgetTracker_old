'use client';

import { useState, useEffect } from 'react';
import { getUserDetail, updateUserDetail } from '../api/api'; // Adjust the path according to your project structure
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        console.log('User info from localStorage:', userInfo); // Debugging line
        if (userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo);
                console.log('Parsed user info:', parsedUser); // Debugging line
                if (parsedUser && parsedUser.uuid) {
                    fetchUserDetail(parsedUser.uuid);
                } else {
                    console.error('Invalid user data found in localStorage');
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
            }
        }
    }, []);

    const fetchUserDetail = async (uuid) => {
        try {
            const data = await getUserDetail(uuid);
            console.log('Fetched user detail:', data); // Debugging line
            setUser(data);
            setFormData({
                username: data.username,
                email: data.email,
                phone: data.phone,
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (user && user.uuid) {
            try {
                const data = await updateUserDetail(user.uuid, formData);
                setUser(data);
                setSuccess('Profile updated successfully!');
                localStorage.setItem('user', JSON.stringify(data));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {user ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Update Profile
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
