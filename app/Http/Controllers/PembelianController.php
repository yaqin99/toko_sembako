<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use App\Models\Supplier;
use App\Models\Barang;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class PembelianController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'pembelian' ; 
        $suppliers = Supplier::all() ; 
        $barangs = Barang::all() ; 
        if ($request->ajax()) {
            
            $data = Pembelian::with(['barang' , 'supplier'])->get();
            
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('nama_barang', function($row){
                    return $row->barang->nama_barang;})
                    ->addColumn('nama_supplier', function($row){
                    return $row->supplier->nama_supplier;})
                    ->addColumn('stok_pembelian', function($row){
                    return $row->stok_pembelian;})
                    ->addColumn('total_biaya', function($row){
                    return $row->total_biaya;})                  
                    ->addColumn('tanggal_pembelian', function($row){
                    return $row->tanggal_pembelian;})                  
                    ->addColumn('action', function($row){
                            $btn = '
                            <div class="btn-group">
                            <a onclick=\'editPembelian(`'.$row.'`)\' class="edit btn btn-warning text-light btn-sm" data-bs-toggle="modal" data-bs-target="#editGuru">
                            <i class="bi bi-pencil-fill" ></i>
                            </a>
                            
                            <a href="javascript:void(0)" onclick=\'deletePembelian(`'.$row->id.'`)\' class="edit btn btn-danger text-light btn-sm"><i class="bi bi-trash3-fill"></i></a>
                            
                            </div>
                            
                            ';
                            
     
                             return $btn;
                         
                           
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('pages.pembelian' , [
            'pages' => $pages , 
            'suppliers' => $suppliers , 
            'barangs' => $barangs , 
        ]);
    }

    
    public function getSingle($id){
        $data = Barang::find($id);
        return $data ; 
    }

    public function addPembelian(Request $request)
    {
     
        if(request('idPembelian') == ''){
            $add = Pembelian::create([
                
                'supplier_id' => request('nama_supplier'), 
                'barang_id' => request('nama_barang'), 
                'stok_pembelian' => request('stok'), 
                'total_biaya' => request('total_biaya'), 
                'tanggal_pembelian' => request('tanggal_pembelian'), 
              ]);
            $stok = Barang::find(request('nama_barang'))->stok;
            Barang::where('id' , request('nama_barang'))->update(
                [
                    'stok' => $stok + request('stok') , 
                ]
            );
        } else {
            $add = Pembelian::where('id' , request('idPembelian'))->update([
                'supplier_id' => request('nama_supplier'), 
                'barang_id' => request('nama_barang'), 
                'stok_pembelian' => request('stok'), 
                'total_biaya' => request('total_biaya'), 
                'tanggal_pembelian' => request('tanggal_pembelian'), 
              ]);

              $stok = Barang::find(request('nama_barang'))->stok;
              Barang::where('id' , request('nama_barang'))->update(
                  [
                      'stok' => $stok + request('stok') , 
                  ]
              );
              
        }
            
        
        
    }

    public function deletePembelian($id)
    {
     
      $data = Pembelian::find($id);
      
      $deltete = Pembelian::where('id' , $id)->delete();
    }

}
