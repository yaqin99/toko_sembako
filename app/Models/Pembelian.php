<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembelian extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function supplier(){
        return $this->hasMany(Supplier::class );
     }
    public function barang(){
        return $this->hasMany(Barang::class );
     }
    public function pelunasan(){
        return $this->hasOne(Pelunasan::class );
     }
}
