<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('barangs')->insert(
            [
                'nama_barang' => 'Kecap Indofood' ,
                'harga_beli' =>  75000 ,
                'harga_jual' =>  9000 ,
                'harga_eceran' =>  7750 ,
                'stok' => 0 , 
                'satuan' => 1 , 
                'etalase_id' => 1 , 
            ]
            );
    }
}
