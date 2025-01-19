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
                'harga_beli' =>  10000 ,
                'harga_jual' =>  12500 ,
                'stok' => 0 , 
                'satuan' => 1 , 
                'etalase_id' => 1 , 
            ]
            );
    }
}
