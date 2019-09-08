<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'id',
        'name',
        'password',
        'secret',
        'type',
        'premdays',
        'lastday',
        'email',
        'creation'
    ];

    public $timestamps = false;

    public function token()
    {
    	return $this->hasOne(Token::class);
    }
}
