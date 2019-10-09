<?php

namespace App\Http\Controllers;

use App\Keywords\KeywordService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class AvailabilityController extends ApiController
{
	/**
	 * Determine email availability. True is available,
	 * false is unavailable.
	 *
	 * @param Request $request
	 * @return mixed
	 */
    public function email(Request $request)
    {
	    $result = DB::table('accounts')
	      ->select('email')
	      ->where('email', $request->email)
	      ->first();

        if ($result) {
	        return $this->respond(false);
        }

        return $this->respond(true);
    }

    /**
     * Determine account name availability.
     *
     * @param Request $request
     * @return mixed
     */
    public function name(Request $request)
    {
        $result = DB::table('accounts')
          ->select('name')
          ->where('name', $request->name)
          ->first();

        if ($result) {
            return $this->respond(false);
        }

        return $this->respond(true);
    }

    /**
     * Determine player name availability.
     *
     * @param Request $request
     * @return mixed
     */
    public function player(Request $request)
    {
        $result = DB::table('players')
          ->select('name')
          ->where('name', $request->name)
          ->first();

        if ($result) {
            return $this->respond(false);
        }

        return $this->respond(true);
    }
}
