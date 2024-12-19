@extends('layout')
@section('main')
<meta name="csrf-token" content="{{ csrf_token() }}">

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-center">
                <h2 class="card-title ">Data Pembelian</h2>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tabel_pembelian" class="display" style="width:100%; align-item:center;">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Barang</th>
                                <th>Nama Supplier</th>
                                <th>Stok Pembelian</th>
                                <th>Biaya</th>
                                <th>Tanggal</th>
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
@include('modals.addPembelian')
@endsection