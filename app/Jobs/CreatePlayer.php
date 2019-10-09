<?php

namespace App\Jobs;

use App\Player;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreatePlayer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $name;
    private $vocation;
    private $townId;
    private $sex;

	/**
	 * Create a new job instance.
	 *
	 * @param $name
	 * @param $vocation
	 * @param $townId
	 * @param $sex
	 */
	public function __construct($name, $vocation, $townId, $sex)
	{
		$this->name = $name;
		$this->vocation = $vocation;
		$this->townId = $townId;
		$this->sex = $sex;
	}


	/**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $player = Player::create([
        	'name' => $this->name,
	        'vocation' => $this->vocation,
	        'town_id' => $this->townId,
	        'sex' => $this->sex
        ]);
    }
}
