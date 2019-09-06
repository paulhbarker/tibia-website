<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'api_tokens';

    protected $fillable = [
        'id',
        'key',
        'account_id',
    ];
}
