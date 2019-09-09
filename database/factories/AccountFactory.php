<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Account;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Account::class, function (Faker $faker) {
    return [
	    'name' => $faker->userName,
	    'password' => '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', // password
	    'email' => $faker->unique()->safeEmail,
	    'type' => Account::ACCOUNT_TYPE_NORMAL,
	    'creation' => Carbon::now()->timestamp
    ];
});
