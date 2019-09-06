<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Account;

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

        if ($account->password != sha1($request->password)) {
            return $this->respondUnauthorized();
        }

        return $this->respondOk();
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
