<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use App\Http\Authentication\ApiTokenGuard;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

	    Auth::extend('api-token', function ($app, $name, $config) {
	    	$userProvider = Auth::createUserProvider($config['provider']);
	    	$request = $app['request'];

		    return new ApiTokenGuard($userProvider, $request);
	    });
    }
}
