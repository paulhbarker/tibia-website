<?php

namespace App\Http\Controllers;

use App\Player;
use App\Http\Requests\CreatePlayerRequest;
use App\Http\Resources\Player as PlayerResource;

class PlayerController extends ApiController
{
	/**
	 * Create an account
	 *
	 * @param CreatePlayerRequest $request
	 * @return PlayerResource
	 */
	public function create(CreatePlayerRequest $request)
	{
		$account = $request->user();
		$player = new Player;

		$player->name = ucfirst(strtolower($request->name));
		$player->vocation = $request->vocation;
		$player->town_id = $request->town;
		$player->sex = $request->sex;

		$player->setDefaultOutfit();
		$account->players()->save($player);

		return $this->respond(new PlayerResource($player));
	}
}
