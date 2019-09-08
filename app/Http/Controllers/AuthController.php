<?php

namespace App\Http\Controllers;

use App\Token;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Account;
use Illuminate\Support\Str;

class AuthController extends ApiController
{
    /**
     * Authenticates a user by username (email) and password and returns
     * an access and refresh token.
     *
     * @param Request $request
     * @return mixed
     */
    protected function login(Request $request)
    {
        $account = Account::where('name', $request->name)->first();

        if (is_null($account) || $account->password != sha1($request->password)) {
            return $this->respondUnauthorized();
        }

        $token = new Token([ 'key' => Str::random(60) ]);
        $token->account()->associate($account);
        $token->save();

        return $this->respond([ 'token' => $token->key ]);
    }

    /**
     * Refreshes an access token.
     *
     * @param Request $request
     * @return mixed
     */
    protected function refresh(Request $request)
    {
        return $this->respondOk();
    }
}
