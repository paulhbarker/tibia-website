<?php

namespace Tests\Unit;

use App\Player;
use Tests\TestCase;

class PlayerTest extends TestCase
{
	/** @test */
	public function a_player_can_calculate_exp()
	{
		$exp = Player::calculateExpForLevel(8);
		$this->assertEquals($exp, 4200);

		$exp = Player::calculateExpForLevel(40);
		$this->assertEquals($exp, 917800);
	}
}
