<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\DepositSuccessful;

class DepositController extends Controller
{
    public function deposit(Request $request)
    {
        // Validate the request
        $request->validate([
            'amount' => 'required|numeric|min:1', // Ensure a valid deposit amount
        ]);

        $user = Auth::user(); // Get the authenticated user
        $amount = $request->input('amount');

        // Process the deposit logic here
        // Example: Add the deposit amount to the user's balance
        $user->balance += $amount;
        $user->save();


        // Send the notification
        $user->notify(new DepositSuccessful($amount));

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Deposit successful!');
    }
}
