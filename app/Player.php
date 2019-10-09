<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
	public const SEX_FEMALE = 0;
	public const SEX_MALE = 1;

	/**
	 * @var array Remove protection on all attr.
	 */
    protected $guarded = [];

	/**
	 * @var bool Don't use default timestamps.
	 */
    public $timestamps = false;

	/**
	 * @var array Default player attributes
	 */
	protected $attributes = [
		'balance' => 10000,
		'cap' => 470,
		'conditions' => '',
		'direction' => 0,
		'experience' => 4200,
		'group_id' => 1,
		'health' => 185,
		'healthmax' => 185,
		'lastlogin' => 0,
		'lastlogout' => 0,
		'level' => 8,
		'lookaddons' => 0,
		'maglevel' => 0,
		'mana' => 90,
		'manamax' => 90,
		'manaspent' => 0,
		'posx' => 0,
		'posy' => 0,
		'posz' => 0,
		'save' => 1,
		'sex' => self::SEX_MALE,
		'skill_axe' => 10,
		'skill_club' => 10,
		'skill_dist' => 10,
		'skill_fishing' => 10,
		'skill_fist' => 10,
		'skill_shielding' => 10,
		'skill_sword' => 10,
		'skull' => 0,
		'skulltime' => 0,
		'soul' => 100,
		'town_id' => Town::THAIS,
	];

	/**
	 * Get the account a player belongs to
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function account()
	{
		return $this->belongsTo(Account::class);
	}

	/**
	 * Get experience required for a level
	 *
	 * @param int $level
	 * @return int
	 */
    public static function calculateExpForLevel(int $level)
    {
    	return intval(50/3 * (pow($level, 3) - 6 * pow($level, 2) + 17 * $level - 12));
    }

	/**
	 * Set sex and colors of default outfit
	 */
    public function setDefaultOutfit()
    {
	    $this->lookbody = 68;
	    $this->lookfeet = 76;
	    $this->lookhead = 78;
	    $this->looklegs = 58;

		switch ($this->sex) {
			case self::SEX_MALE: $this->setMaleOutfit(); break;
			case self::SEX_FEMALE: $this->setFemaleOutfit(); break;
			default: $this->setMaleOutfit();
		}
    }

	/**
	 * Set female outfit looktype
	 */
    private function setFemaleOutfit()
    {
		$this->looktype = 136;
    }

	/**
	 * Set male outfit looktype
	 */
    public function setMaleOutfit()
    {
	    $this->looktype = 128;
    }
}
