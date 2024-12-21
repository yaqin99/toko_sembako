<?php

namespace App\Http\Controllers;

use App\Models\Pelunasan;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class PelunasanController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'pelunasan' ; 
       
        if ($request->ajax()) {
            
            $data = Pelunasan::with(['supplier'])->get();
            
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('supplier', function($row){
                    return $row->supplier->nama_supplier;})
                    ->addColumn('tempo_piutang', function($row){
                    return $row->tempo_piutang;})
                    ->addColumn('jumlah_piutang', function($row){
                    return $row->jumlah_piutang;})
                    ->addColumn('total_pembayaran', function($row){
                    return $row->total_pembayaran;})
                    ->addColumn('sisa_piutang', function($row){
                    return $row->sisa_piutang;})
                    ->addColumn('tanggal_pembayaran', function($row){
                    return $row->tanggal_pembayaran;})
                    ->addColumn('status', function($row){
                    return $row->status;})
                                  
                                    
                    ->addColumn('action', function($row){
                            $btn = '
                            <div class="btn-group">
                            <a onclick=\'pelunasan(`'.$row.'`)\' class="edit btn btn-success text-dark btn-sm" data-bs-toggle="modal" data-bs-target="#editGuru">
                            <i class="bi bi-arrow-up-circle-fill"></i>
                            </a>
                            
                            
                            </div>
                            
                            ';
                            
     
                             return $btn;
                         
                           
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('pages.pelunasan' , [
            'pages' => $pages , 
             
        ]);
    }

    
    

    public function editPelunasan(Request $request)
    {
     
        if(request('idPembelian') == ''){
            $add = Pelunasan::create([
                
                'supplier_id' => request('nama_supplier'), 
                'barang_id' => request('nama_barang'), 
                'stok_pembelian' => request('stok'), 
                'total_biaya' => request('total_biaya'), 
                'tanggal_pembelian' => request('tanggal_pembelian'), 
                'total_pembayaran' => request('bayar'), 
                'tipe_pembayaran' => request('metode'), 
              ]);
            

            if (request('metode') == 2) {
                Pelunasan::create([
                    'supplier_id' => request('nama_supplier'), 
                    'pembelian_id' => $add->id , 
                    'tempo_piutang' => request('piutang'), 
                    'tanggal_pembayaran' => request('tanggal_pembelian'), 
                    'total_pembayaran' => request('bayar'), 
                    'jumlah_piutang' => request('total_biaya'), 
                    'sisa_piutang' => request('total_biaya') - request('bayar') , 
                    'status' => 'Belum Lunas' , 
                ]);
            }

        } else {
            $add = Pelunasan::where('id' , request('idPembelian'))->update([
            'supplier_id' => request('nama_supplier'), 
            'barang_id' => request('nama_barang'), 
            'stok_pembelian' => request('stok'), 
            'total_biaya' => request('total_biaya'), 
            'tanggal_pembelian' => request('tanggal_pembelian'), 
            'total_pembayaran' => request('bayar'), 
            'tipe_pembayaran' => request('metode'), 

            ]);
              
            $totalStok = Pelunasan::where('barang_id',request('nama_barang'))->sum('stok_pembelian');           
            

            if (request('metode') == 2) {
                Pelunasan::create([
                    'supplier_id' => request('nama_supplier'), 
                    'pembelian_id' => request('idPembelian') , 
                    'tempo_piutang' => request('piutang'), 
                    'tanggal_pembayaran' => request('tanggal_pembelian'), 
                    'total_pembayaran' => request('bayar'), 
                    'jumlah_piutang' => request('total_biaya'), 
                    'sisa_piutang' => request('total_biaya') - request('bayar') , 
                    'status' => 'Belum Lunas' , 
                ]);
            } else {
                Pelunasan::where('pembelian_id', request('idPembelian'))->delete();
            }
              
        }
            
        
        
    }

    
}
