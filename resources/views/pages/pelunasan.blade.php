@extends('layout')
@section('main')
<meta name="csrf-token" content="{{ csrf_token() }}">

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-center">
                <h2 class="card-title ">Data Pelunasan Piutang</h2>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tabel_piutang" class="display" style="width:100%; align-item:center;">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Supplier</th>
                                <th>Tempo Piutang</th>
                                <th>Jumlah Piutang</th>
                                <th>Total Pembayaran</th>
                                <th>Sisa Piutang</th>
                                <th>Tanggal Pembayaran</th>
                                <th>Status</th>
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
@include('modals.editPelunasan')
@endsection