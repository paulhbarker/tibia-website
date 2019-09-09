<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Token extends Model
{
	public const API_TOKEN_LENGTH = 60;

    protected $table = 'api_tokens';

    protected $fillable = [
        'key',
        'account_id',
    ];

	/**
	 * The "booting" method of the model.
	 *
	 * @return void
	 */
	protected static function boot()
	{
		parent::boot();

		static::creating(function ($query) {
			$query->key = $query->key ?? Str::random(Token::API_TOKEN_LENGTH);
		});
	}

    public function account()
    {
    	return $this->belongsTo(Account::class);
    }
}
