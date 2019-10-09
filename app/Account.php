<?php

namespace App;

use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

class Account extends Model implements Authenticatable, UserProvider
{
	public const ACCOUNT_TYPE_NORMAL = 1;
	public const ACCOUNT_TYPE_TUTOR = 2;
	public const ACCOUNT_TYPE_SENIORTUTOR = 3;
	public const ACCOUNT_TYPE_GAMEMASTER = 4;
	public const ACCOUNT_TYPE_GOD = 5;

	protected $fillable = [
		'id',
		'name',
		'password',
		'secret',
		'type',
		'premdays',
		'lastday',
		'email',
		'creation',
	];

	public $timestamps = false;

	public function token()
	{
		return $this->hasOne(Token::class);
	}

	public function players()
	{
		return $this->hasMany(Player::class);
	}

	public function updateToken()
	{
		if ($this->token()) {
			$this->token()->delete();
		}

		return Token::create([ 'account_id' => $this->id ]);
	}

	/**
	 * Get the name of the unique identifier for the account.
	 *
	 * @return string
	 */
	public function getAuthIdentifierName()
	{
		return 'id';
	}

	/**
	 * Get the unique identifier for the account.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->id;
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the token value for the "remember me" session.
	 *
	 * @return string
	 */
	public function getRememberToken()
	{
		return null;
	}

	/**
	 * Set the token value for the "remember me" session.
	 *
	 * @param  string $value
	 * @return void
	 */
	public function setRememberToken($value)
	{
		return null;
	}

	/**
	 * Get the column name for the "remember me" token.
	 *
	 * @return string
	 */
	public function getRememberTokenName()
	{
		return null;
	}

	/**
	 * Retrieve an account by their unique identifier.
	 *
	 * @param  mixed $identifier
	 * @return \Illuminate\Contracts\Auth\Authenticatable|null
	 */
	public function retrieveById($identifier)
	{
		return $this->find($identifier);
	}

	/**
	 * Retrieve a user by their unique identifier and "remember me" token.
	 *
	 * @param  mixed $identifier
	 * @param  string $token
	 * @return \Illuminate\Contracts\Auth\Authenticatable|null
	 */
	public function retrieveByToken($identifier, $token)
	{
		return $this->find($identifier);
	}

	/**
	 * Update the "remember me" token for the given user in storage.
	 *
	 * @param  \Illuminate\Contracts\Auth\Authenticatable $account
	 * @param  string $token
	 * @return void
	 */
	public function updateRememberToken(Authenticatable $account, $token)
	{
		return null;
	}

	/**
	 * Retrieve an account by the given credentials.
	 *
	 * @param  array $credentials
	 * @return \Illuminate\Contracts\Auth\Authenticatable|null
	 */
	public function retrieveByCredentials(array $credentials)
	{
		return $this->where('name', $credentials['name'])->first();
	}

	/**
	 * Validate an account against the given credentials.
	 *
	 * @param  \Illuminate\Contracts\Auth\Authenticatable $account
	 * @param  array $credentials
	 * @return bool
	 */
	public function validateCredentials(Authenticatable $account, array $credentials)
	{
		return $account->password == sha1($credentials['password']);
	}
}
