<?php

namespace App\Http\Controllers;

use App\Account;
use App\Http\Requests\CreateAccountRequest;

class AccountController extends ApiController
{
	/**
	 * Create an account
	 *
	 * @param CreateAccountRequest $request
	 * @return \Illuminate\Http\Response
	 */
	public function create(CreateAccountRequest $request)
	{
	    Account::create([
	        'name' => $request->name,
	        'password' => sha1($request->password),
	        'email' => $request->email
	    ]);

        return $this->respondOk();
	}
}
