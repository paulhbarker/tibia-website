<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function (){
	Route::get('/health', 'StatusController@health');
	Route::get('/availability/email', 'AvailabilityController@email');
	Route::get('/availability/name', 'AvailabilityController@name');
	Route::get('/availability/player', 'AvailabilityController@player');

	// Accounts
	Route::post('account', 'AccountController@create');

	// Authentication
	Route::post('login', 'AuthController@login');

	// Authenticated user interactions
	Route::group(['middleware' => 'auth:api'], function() {
		Route::get('account', 'AccountController@get');
	});
});
