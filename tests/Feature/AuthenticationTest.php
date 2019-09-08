<?php

namespace Tests\Feature;

use App\Account;
use App\Token;
use Illuminate\Support\Str;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthenticationTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
	public function an_account_can_log_in()
	{
		$account = Account::create([
			'name' => 'test1',
			'password' => sha1('password')
		]);

		$response = $this->json('POST', '/api/v1/login', [
			'name' => 'test1',
			'password' => 'password'
		]);

		$response->assertStatus(200);
		$response->assertJsonStructure([ 'token' ]);

		$token = $response->decodeResponseJson()['token'];

		$this->assertDatabaseHas('api_tokens', [
			'account_id' => $account->id,
			'key' => $token
		]);
	}

	/** @test */
	public function an_account_must_use_proper_credentials()
	{
		Account::create([ 'name' => 'test1', 'password' => sha1('password') ]);

		$response = $this->json('POST', '/api/v1/login', [
			'name' => 'bogus',
			'password' => 'bogus'
		]);

		$response->assertStatus(401);
	}

	/** @test */
	public function login_replaces_current_token_with_new_token()
	{
		$account = Account::create([ 'name' => 'test1', 'password' => sha1('password') ]);
		$token = new Token([ 'key' => Str::random(60) ]);
		$token->account()->associate($account);

		$response = $this->json('POST', '/api/v1/login', [
			'name' => 'test1',
			'password' => 'password'
		]);

		$response->assertStatus(200);

		$newToken = $response->decodeResponseJson()['token'];

		$this->assertDatabaseMissing('api_tokens', [ 'key' => $token->key ]);
		$this->assertDatabaseHas('api_tokens', [ 'key' => $newToken ]);
	}
}
