<?php

namespace App\Http\Controllers;

use App\Models\Pelunasan;
use App\Models\Pembelian;
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
                    return "Rp " . number_format($row->jumlah_piutang, 2, ",", ".");})
                    ->addColumn('total_pembayaran', function($row){
                        
                    return "Rp " . number_format($row->total_pembayaran, 2, ",", ".");})
                    ->addColumn('sisa_piutang', function($row){
                    return "Rp " . number_format($row->sisa_piutang, 2, ",", ".");})
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

    
    

    public function Pelunasan(Request $request)
    {
            $status = request('jumlah_piutang') - request('total_pembayaran_piutang');
            if ($status <= 0) {
               $bahas = 'Lunas';
            } else {
                $bahas = 'Belum Lunas';

            }
            $edit = Pelunasan::where('id' , request('idPelunasan'))->update([
            'tempo_piutang' => request('tempo_piutang'), 
            'jumlah_piutang' => request('jumlah_piutang'), 
            'total_pembayaran' => request('total_pembayaran_piutang'), 
            'sisa_piutang' => $status, 
            'tanggal_pembayaran' => request('tanggal_pembayaran'), 
            'status' => $bahas , 
            ]);
              
            Pembelian::where('id' , request('idPembeli'))->update([
                'total_pembayaran' => request('total_pembayaran_piutang'), 
            ]);
              
        }
            
        
        
    

    
}
