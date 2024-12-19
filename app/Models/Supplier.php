<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pelunasan(){
        return $this->belongsToMany(Pelunasan::class , 'supplier_id');
     }
    public function pembelian(){
        return $this->hasMany(Pembelian::class , 'supplier_id');
     }
}
