<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelunasan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function supplier(){
        return $this->hasMany(Supplier::class );
     }
    public function pembelian(){
        return $this->belongsTo(Pembelian::class );
     }
}
