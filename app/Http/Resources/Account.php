<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class Account extends JsonResource
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
		    'email' => $this->email,
		    'type' => $this->type,
		    'premdays' => $this->premdays,
		    'lastday' => $this->lastday,
		    'created_at' => Carbon::parse($this->creation)->toISOString()
	    ];
    }
}
