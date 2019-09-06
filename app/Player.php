<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = [
        'id',
        'name',
        'group_id',
        'account_id',
        'level',
        'vocation',
        'health',
        'healthmax',
        'experience',
        'lookbody',
        'lookfeet',
        'lookhead',
        'looklegs',
        'looktype',
        'lookaddons',
        'maglevel',
        'mana',
        'manamax',
        'manaspent',
        'soul',
        'town_id',
        'posx',
        'posy',
        'posz',
        'conditions',
        'cap',
        'sex',
        'lastlogin',
        'lastip',
        'save',
        'skull',
        'skulltime',
        'lastlogout',
        'blessings',
        'onlinetime',
        'deletion',
        'balance',
        'offlinetraining_time',
        'offlinetraining_skill',
        'stamina',
        'skill_fist',
        'skill_fist_tries',
        'skill_club',
        'skill_club_tries',
        'skill_sword',
        'skill_sword_tries',
        'skill_axe',
        'skill_axe_tries',
        'skill_dist',
        'skill_dist_tries',
        'skill_shielding',
        'skill_shielding_tries',
        'skill_fishing',
        'skill_fishing_tries'
    ];

    public $timestamps = false;
}
