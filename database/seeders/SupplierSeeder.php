<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('suppliers')->insert(
            [
                'nama_supplier' => 'PT. Indofood Jaya Tbk' ,
                'no_hp' =>  '085265459878' ,
                'alamat' => 'Jl. raya Indofood' , 
                'email' => 'indofood.1965@gmail.com' ,           
            ]
            );
    }
}
