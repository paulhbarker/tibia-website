<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class Player extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
	    return [
		    'id' => $this->id,
		    'name' => $this->name,
		    'level' => $this->level,
		    'vocation' => $this->vocation,
		    'town_id' => $this->town_id,
		    'sex' => $this->sex,
		    'lookbody' => $this->lookbody,
		    'looklegs' => $this->looklegs,
		    'lookfeet' => $this->lookfeet,
		    'lookhead' => $this->lookhead,
		    'looktype' => $this->looktype,
		    'lookaddons' => $this->lookaddons,
		    'maglevel' => $this->maglevel,
		    'skill_axe' => $this->skill_axe,
		    'skill_club' => $this->skill_club,
		    'skill_dist' => $this->skill_dist,
		    'skill_fishing' => $this->skill_fishing,
		    'skill_fist' => $this->skill_fist,
		    'skill_shielding' => $this->skill_shielding,
		    'skill_sword' => $this->skill_sword,
		    'lastlogin' => $this->lastlogin,
		    'lastip' => $this->lastip,
	    ];
    }
}
