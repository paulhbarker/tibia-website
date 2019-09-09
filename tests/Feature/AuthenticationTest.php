<?php

namespace Tests\Feature;

use App\Token;
use App\Account;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthenticationTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
	public function an_account_can_log_in()
	{
		$account = factory(Account::class)->create();

		$response = $this->json('POST', '/api/v1/login', [
			'name' => $account->name,
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
		factory(Account::class)->create();

		$response = $this->json('POST', '/api/v1/login', [
			'name' => 'bogus',
			'password' => 'bogus'
		]);

		$response->assertStatus(401);

		$response = $this->json('POST', '/api/v1/login', [
			'name' => 'test1',
			'password' => 'bogus'
		]);

		$response->assertStatus(401);
	}

	/** @test */
	public function login_replaces_current_token_with_new_token()
	{
		$account = factory(Account::class)->create();
		$token = factory(Token::class)->create([ 'account_id' => $account->id ]);

		$response = $this->json('POST', '/api/v1/login', [
			'name' => $account->name,
			'password' => 'password'
		]);

		$response->assertStatus(200);

		$newToken = $response->decodeResponseJson()['token'];

		$this->assertDatabaseMissing('api_tokens', [ 'key' => $token->key ]);
		$this->assertDatabaseHas('api_tokens', [ 'key' => $newToken ]);
	}

	/** @test */
	public function an_account_can_access_protected_endpoints()
	{
		$account = factory(Account::class)->create();
		$token = factory(Token::class)->create([ 'account_id' => $account->id ]);

		$response = $this->json('GET', '/api/v1/account', [], ['Authorization' => 'Bearer '.$token->key]);
		$response->assertStatus(200);
	}
}
