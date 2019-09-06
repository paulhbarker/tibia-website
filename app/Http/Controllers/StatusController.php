<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class StatusController extends ApiController
{
	/**
	 * Check the application health
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function health(Request $request)
	{
		return response('', 200);
	}
}
