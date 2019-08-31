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

	// Login
	Route::match(['get','post'], 'login', 'Auth\AuthController@authenticate')->name('login');
	Route::match(['get','post'], 'login/refresh', 'Auth\AuthController@refreshToken')->name('refresh');

	// Accounts
	Route::post('account', 'AccountController@store');
	Route::post('password/recovery', 'Auth\AuthController@passwordRecovery');
	Route::post('password/set', 'Auth\AuthController@passwordSet');

	// Authenticated user interactions
	Route::group(['middleware' => 'auth:api'], function() {

		// Users
		Route::get('user', 'UserController@index');
		Route::post('user', 'UserController@update');
		Route::post('user/setup', 'UserController@completeSetup');

		// Passwords
		Route::post('password/update', 'Auth\AuthController@update');

		// Accounts
		Route::get('account', 'AccountController@index');
	});
});
