<?php

namespace App\Http\Authentication;

use App\Account;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class ApiTokenGuard implements Guard
{
	/**
	 * The authenticated account.
	 *
	 * @var \App\Account
	 */
	protected $account;

	/**
	 * The request instance.
	 *
	 * @var \Illuminate\Http\Request
	 */
	protected $request;

	/**
	 * The user provider
	 *
	 * @var \Illuminate\Contracts\Auth\UserProvider
	 */
	protected $provider;

	/**
	 * Create a new authentication guard.
	 *
	 * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
	 * @param  \Illuminate\Http\Request  $request
	 * @return void
	 */
	public function __construct(UserProvider $provider, Request $request)
	{
		$this->request = $request;
		$this->provider = $provider;
	}

	/**
	 * Determine if the current user is authenticated.
	 *
	 * @return bool
	 */
	public function check()
	{
		return ! is_null($this->user());
	}

	/**
	 * Determine if the current user is a guest.
	 *
	 * @return bool
	 */
	public function guest()
	{
		return ! $this->check();
	}

	/**
	 * Get the currently authenticated user.
	 *
	 * @return \App\Account|null
	 */
	public function user()
	{
		if (! is_null($this->account)) {
			return $this->account;
		}

		$account = null;

		$token = $this->getTokenForRequest();

		if (! empty($token)) {
			$account = Account::whereHas('token', function (Builder $query) use ($token) {
				$query->where('key', $token);
			})->first();
		}

		return $this->account = $account;
	}

	/**
	 * Get the token for the current request.
	 *
	 * @return string
	 */
	public function getTokenForRequest()
	{
		return $this->request->bearerToken();
	}

	/**
	 * Get the ID for the currently authenticated user.
	 *
	 * @return int|string|null
	 */
	public function id()
	{
		if ($this->user()) {
			return $this->user()->getAuthIdentifierName();
		}
	}

	/**
	 * Validate a user's credentials.
	 *
	 * @param  array $credentials
	 * @return bool
	 */
	public function validate(array $credentials = [])
	{
		$account = $this->provider->retrieveByCredentials($credentials);

		if (! is_null($account) && $account->validateCredentials($account, $credentials)) {
			$this->setUser($account);

			return true;
		}

		return false;
	}

	/**
	 * Set the current user.
	 *
	 * @param  \Illuminate\Contracts\Auth\Authenticatable $account
	 * @return void
	 */
	public function setUser(Authenticatable $account)
	{
		$this->account = $account;
	}
}
