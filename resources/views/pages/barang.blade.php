@extends('layout')
@section('main')
<meta name="csrf-token" content="{{ csrf_token() }}">
<style>
    #tabel_barang tbody tr {
            color: black ; 
        }
</style>
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-center">
                <h2 class="card-title ">Data Barang</h2>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tabel_barang" class="display" style="width:100%; align-item:center;">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Barang</th>
                                <th>Harga Eceran</th>
                                <th>Harga Beli</th>
                                <th>Harga Jual</th>
                                <th>Stok</th>
                                <th>Satuan</th>
                                <th>Etalase</th>
                                <th>Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    </div>
   
</div>
@include('modals.addBarang')
@endsection