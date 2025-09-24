<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
<<<<<<< HEAD
=======
        $middleware->group('api', [
            \App\Http\Middleware\CookieTokenAuth::class,
        ]);

>>>>>>> d5a0cce5b64ce84fae38b7e34d02a0f9f12a5fff
        $middleware->api(prepend: [
            EnsureFrontendRequestsAreStateful::class,
            HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    })
    ->create();