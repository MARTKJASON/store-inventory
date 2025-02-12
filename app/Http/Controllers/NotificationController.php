<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function notifications()
    {
        $user = Auth::user();


        // Fetch notifications for the authenticated user
        $notifications = $user->notifications()->latest()->get();

        return inertia('notifications', [
            'notifications' => $notifications,
        ]);

    }

    public function sendWelcomeNotification()
    {
        // $users = User::all(); //all users
        // $user->notify(new WelcomeNotification()); // single user notif
        $adminUsers = User::where('is_admin', true)->get();



        foreach ($adminUsers as $user) {
            $message = 'Welcome, ' . $user->first_name . '!';
             $user->notify(new WelcomeNotification($message));
        }

        return redirect()->back()->with('success', 'Notification sent!');
    }

    public function markAsRead($id)
    {
        $user = Auth::user(); // Ensure the user is authenticated
        $notification = $user->notifications()->find($id); // Find the notification

        if ($notification) {
            $notification->markAsRead(); // Mark as read
            return;
        }

        return response()->json(['error' => 'Notification not found'], 404);
    }
}
