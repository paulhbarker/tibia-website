<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthCheckTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_health_check()
    {
        $response = $this->get('/api/v1/health');

        $response->assertStatus(200);
    }
}
