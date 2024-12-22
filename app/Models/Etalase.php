<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etalase extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function barang(){
        return $this->hasMany(Barang::class);
     }
}
