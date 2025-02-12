<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Paginate users and return as JSON response
        $user = Auth::user();

        return Inertia::render('test', [
            'user' => $user
        ]);

    }

    /**
     * Show the login form.
     */
    public function showLoginForm()
    {
        return Inertia::render('login');
    }

    /**
     * Handle the login request.
     */
    public function userLogin(Request $request)
    {
        // Validate login credentials
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt login
        if (Auth::attempt($credentials)) {
            // Regenerate session ID after successful login
            $request->session()->regenerate();

            // Return a success response
            return response()->json(['message' => 'Login successful'], 200);
        }

        // If authentication fails, return a 401 Unauthorized response
        return response()->json(['message' => 'Invalid credentials'], 401);
    }


    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('register');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
            // Validate user data
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'is_admin' => 'nullable|boolean',  // Optional
        'password' => 'required|string|min:8|max:255',
        'store_id' => 'required|string|max:255',

    ]);

    // Hash the password before storing it
    $validated['password'] = bcrypt($validated['password']);

    // Create the new user
    $user = User::create($validated);

    Auth::login($user);

    return redirect()->route('products.index')->with('success', 'User registered and logged in.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        return Inertia::render('login', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(string $id)
    {
        // Retrieve user by ID
        $user = User::findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        // Log out the user
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the session token
        $request->session()->regenerateToken();

        // Redirect to the login page or return a JSON response
        return redirect()->route('login')->with('success', 'Logged out successfully.');
    }


    /**
     * Update the specified user.
     */
    public function update(Request $request, string $id)
    {
        // Retrieve the user and validate the updated data
        $user = User::findOrFail($id);
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|max:255', // Password is optional for update
        ]);

        // Update the user with validated data
        $user->updateUser($validatedData);

        // Redirect back to users index with success message
       return redirect()->route('users.index')->with('success', 'User updated successfully.');

    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(string $id)
    {
        // Find the user and delete it
        $user = User::findOrFail($id);
        $user->delete();

        // Redirect to users index with success message
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
