<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\EtalaseController;
use App\Http\Controllers\PelunasanController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [BarangController::class , 'index']);
Route::get('/deleteBarang/{id}', [BarangController::class , 'deleteBarang']);
Route::post('/addBarang', [BarangController::class , 'addBarang']);


Route::get('/supplier', [SupplierController::class , 'index']);
Route::get('/deleteSupplier/{id}', [SupplierController::class , 'deleteSupplier']);
Route::post('/addSupplier', [SupplierController::class , 'addSupplier']);


Route::get('/pembelian', [PembelianController::class , 'index']);
Route::get('/getSingleBarang/{id}', [PembelianController::class , 'getSingle']);
Route::get('/deletePembelian/{id}', [PembelianController::class , 'deletePembelian']);
Route::post('/addPembelian', [PembelianController::class , 'addPembelian']);

Route::get('/piutang', [PelunasanController::class , 'index']);
Route::post('/pelunasan', [PelunasanController::class , 'pelunasan']);

Route::get('/etalase', [EtalaseController::class , 'index']);
Route::get('/deleteEtalase/{id}', [EtalaseController::class , 'deleteEtalase']);
Route::post('/addEtalase', [EtalaseController::class , 'addEtalase']);
