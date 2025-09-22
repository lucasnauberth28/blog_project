<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    private $allowedDomains = ['phng.com.br', 'phng.com'];

    public function sendVerificationCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $email = $request->input('email');
        $name = $request->input('name');
        $domain = Str::after($email, '@');

        if (!in_array($domain, $this->allowedDomains)) {
            return response()->json(['message' => 'Domínio de e-mail não autorizado.'], 403);
        }

        $code = rand(100000, 999999);

        $user = User::where('email', $email)->first();
        $user = User::where('name', $name)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => bcrypt(Str::random(16))
            ]);
        }
        
        $user->forceFill([
            'remember_token' => $code,
            'email_verified_at' => Carbon::now()->addMinutes(5),
        ])->save();
        
        Mail::to($user->email)->send(new VerificationCodeMail($code));

        return response()->json(['message' => 'Código de verificação enviado!']);
    }

    public function verifyAndLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|digits:6'
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (!$user || $user->remember_token !== $request->input('code') || Carbon::now()->gt($user->email_verified_at)) {
            return response()->json(['message' => 'Código inválido ou expirado.'], 401);
        }
        
        $user->forceFill([
            'remember_token' => null,
            'email_verified_at' => null,
        ])->save();

        $token = $user->createToken('auth-token');
        
        return response()->json(['message' => 'Login bem sucedido'])->cookie('auth_token', $token->plainTextToken, 60 * 24 * 7, null, null, true, true);
    }
}