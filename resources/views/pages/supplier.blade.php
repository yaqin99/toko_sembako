@extends('layout')
@section('main')
<meta name="csrf-token" content="{{ csrf_token() }}">
<style>
    #tabel_supplier tbody tr {
            color: black ; 
        }
</style>
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-center">
                <h2 class="card-title ">Data Supplier</h2>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tabel_supplier" class="display" style="width:100%; align-item:center;">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Supplier</th>
                                <th>No Hp</th>
                                <th>Alamat</th>
                                <th>Email</th>
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
@include('modals.addSupplier')
@endsection