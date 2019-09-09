<?php

namespace App\Http\Controllers;

use App\Account;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\CreateAccountRequest;
use App\Http\Resources\Account as AccountResource;

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
	        'email' => $request->email,
	        'creation' => Carbon::now()->timestamp,
	        'type' => Account::ACCOUNT_TYPE_NORMAL
	    ]);

        return $this->respondOk();
	}

	public function get(Request $request)
	{
		return new AccountResource($request->user());
	}
}
