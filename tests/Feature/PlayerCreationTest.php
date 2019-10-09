<?php

namespace Tests\Feature;

use App\Account;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlayerCreationTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
    public function an_account_can_add_a_player()
    {
	    $account = factory(Account::class)->create();
	    $this->actingAs($account);

	    $response = $this->json('POST', '/api/v1/player', [
        	'name' => 'pogchamp',
	        'vocation' => 1,
	        'town' => 1,
	        'sex' => 0
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Pogchamp',
            'level' => 8,
            'vocation' => 1,
            'town_id' => 1,
            'sex' => 0,
            'lookbody' => 68,
            'looklegs' => 58,
            'lookfeet' => 76,
            'lookhead' => 78,
            'looktype' => 136,
            'lookaddons' => null,
            'maglevel' => 0,
            'skill_axe' => 10,
            'skill_club' => 10,
            'skill_dist' => 10,
            'skill_fishing' => 10,
            'skill_fist' => 10,
            'skill_shielding' => 10,
            'skill_sword' => 10,
            'lastlogin' => 0,
            'lastip' => null,
        ]);

        $this->assertDatabaseHas('players', [
	        'name' => 'Pogchamp',
	        'vocation' => 1,
	        'town_id' => 1,
	        'sex' => 0,
	        'balance' => 10000,
	        'cap' => 470,
	        'conditions' => '',
	        'direction' => 0,
	        'experience' => 4200,
	        'group_id' => 1,
	        'health' => 185,
	        'healthmax' => 185,
	        'lastlogin' => 0,
	        'lastlogout' => 0,
	        'level' => 8,
	        'maglevel' => 0,
	        'mana' => 90,
	        'manamax' => 90,
	        'manaspent' => 0,
	        'posx' => 0,
	        'posy' => 0,
	        'posz' => 0,
	        'save' => 1,
	        'skill_axe' => 10,
	        'skill_club' => 10,
	        'skill_dist' => 10,
	        'skill_fishing' => 10,
	        'skill_fist' => 10,
	        'skill_shielding' => 10,
	        'skill_sword' => 10,
	        'skull' => 0,
	        'skulltime' => 0,
	        'soul' => 100,
        ]);
    }
}
