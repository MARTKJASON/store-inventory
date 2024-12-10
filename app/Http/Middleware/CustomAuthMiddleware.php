<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated by checking the session or any custom condition
        if (!session()->has('user_id') && !Auth::check()) {
            // User is not authenticated, redirect to login page
            return redirect()->route('login');
        }

        // If the user is authenticated, proceed to the next request
        return $next($request);
    }
}

