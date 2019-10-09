<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AccountCreationTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
    public function an_account_can_be_created()
    {
        $response = $this->json('POST', '/api/v1/account', [
        	'name' => 'test1',
	        'password' => 'password',
	        'email' => 'test@test.com'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('accounts', [
	        'name' => 'test1',
	        'password' => sha1('password'),
	        'email' => 'test@test.com'
        ]);
    }
}
