<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtalaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('etalases')->insert(
            [
                'nama_etalase' => 'Bumbu Penyedap' ,
                
            ]
            );
        DB::table('etalases')->insert(
            [
                'nama_etalase' => 'Makanan Ringan' ,
                
            ]
            );
        DB::table('etalases')->insert(
            [
                'nama_etalase' => 'Obat' ,
                
            ]
            );
        DB::table('etalases')->insert(
            [
                'nama_etalase' => 'Minuman' ,
                
            ]
            );
    }
}
