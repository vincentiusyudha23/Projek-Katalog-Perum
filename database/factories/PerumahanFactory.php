<?php

namespace Database\Factories;

use App\Models\perumahan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\perumahan>
 */

class PerumahanFactory extends Factory

{
   
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = perumahan::class;
    public function definition(): array
    {
        
        return [
            'nama'=>$this->faker->city(),
            'kelurahan'=>$this->faker->streetName(),
            'kecamatan'=>$this->faker->city(),
            'nama_pengembang'=>$this->faker->company(),
            'luas_lahan_perumahan'=>$this->faker->randomNumber(5, true),
            'jumlah_rumah'=>$this->faker->randomNumber(3, false),
            'luas_PSU'=>$this->faker->randomFloat(1, 20, 30),
            'tpu'=>$this->faker->word(),
            'tahun_berdiri'=>$this->faker->year(),
            'rincian_psu'=>$this->faker->paragraph(),
            'highlightPhoto'=>"https://picsum.photos/seed/img3/1920/1080"
        ];
    }
}
