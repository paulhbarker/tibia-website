<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Token;
use Faker\Generator as Faker;

$factory->define(Token::class, function (Faker $faker) {
    return [
        'key' => \Illuminate\Support\Str::random(Token::API_TOKEN_LENGTH),
        'account_id' => function () {
	        return factory(App\Account::class)->create()->id;
        },
    ];
});
