<?php

namespace App\Http\Controllers;

use App\Token;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Account;
use Illuminate\Support\Facades\Auth;
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
    	$credentials = $request->only([ 'name', 'password' ]);

    	if (Auth::validate($credentials)) {
		    $token = $request->user()->updateToken();

		    return $this->respond([ 'token' => $token->key ]);
	    }

	    return $this->respondUnauthorized();
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
