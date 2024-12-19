<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pelunasans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id');
            $table->foreignId('pembelian_id');
            $table->date('tempo_piutang');
            $table->date('tanggal_pembayaran');
            $table->string('total_pembayaran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelunasans');
    }
};
