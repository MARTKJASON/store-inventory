import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navbar from '../Components/Navbar';

interface Notification {
    id: string;
    data: {
        message: string;
        url: string;
    };
    read_at: string | null;
    notifiable_id: string;
}

interface Props {
    notifications: Notification[];
}

const NotificationsPage: React.FC<Props> = ({ notifications }) => {
    // Function to mark a notification as read using Inertia
    const markAsRead = (id: string) => {
        Inertia.post(`/notifications/${id}/read`, {}, {
            onSuccess: () => {
                alert('Notification marked as read');
            },
            onError: (error) => {
                console.error('Error marking notification as read:', error);
                alert('Failed to mark notification as read');
            }
        });
    };

    return (
        <>
        <Navbar/>
        <h1 className="text-2xl font-bold mb-6 mt-9">Notifications</h1>
        <ul className="space-y-4">
            {notifications.map((notification) => (
                <li
                    key={notification.id}
                    className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
                >
                    <div>
                        <a
                            href={notification.data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {notification.data.message}
                        </a>
                    </div>
                    <div>
                        {notification.read_at ? (
                            <span className="text-blue-700 font-medium">Read</span>
                        ) : (
                            <button
                                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={() => markAsRead(notification.id)}
                            >
                                Mark as Read
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    </>
    );
};

export default NotificationsPage;
