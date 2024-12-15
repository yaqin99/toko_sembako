<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function etalase(){
        return $this->belongsTo(Etalase::class , 'barang_id');
     }
    public function pembelian(){
        return $this->belongsTo(Pembelian::class , 'barang_id');
     }
}
