<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use App\Models\Supplier;
use App\Models\Barang;
use App\Models\Pelunasan;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class PembelianController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'pembelian' ; 
        $suppliers = Supplier::where('delete_mark' , 0)->get() ; 
        $barangs = Barang::where('delete_mark' , 0)->get() ; 
        if ($request->ajax()) {
            
            $data = Pembelian::where('delete_mark' , 0)->with(['barang' , 'supplier','pelunasan'])->get();
            
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('nama_barang', function($row){
                    return $row->barang->nama_barang;})
                    ->addColumn('nama_supplier', function($row){
                    return $row->supplier->nama_supplier;})
                    ->addColumn('stok_pembelian', function($row){
                    return $row->stok_pembelian;})
                    ->addColumn('jenis_pembelian', function($row){
                     if ($row->jenis_pembelian == 1) {
                        return 'Pcs' ; 
                     } else {
                        return 'Karton' ;
                     }
                    })
                    ->addColumn('total_biaya', function($row){
                    return "Rp " . number_format($row->total_biaya, 2, ",", ".");
                    })
                    ->addColumn('total_pembayaran', function($row){
                    return "Rp " . number_format($row->total_pembayaran, 2, ",", ".");
                    })                  
                    ->addColumn('kembalian', function($row){
                    $kembali = $row->total_pembayaran - $row->total_biaya ; 
                    return "Rp " . number_format($kembali, 2, ",", ".");
                    })                  
                    ->addColumn('tipe_pembayaran', function($row){
                        if ($row->tipe_pembayaran == 1) {
                           return 'Cash';
                        } 
                        else {
                            return 'Credit';
                        }
                    })                  
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
                'jenis_pembelian' => request('jenis_pembelian'), 
                'total_pembayaran' => request('bayar'), 
                'tipe_pembayaran' => request('metode'), 
              ]);
            $stok = Barang::find(request('nama_barang'))->stok;
            Barang::where('id' , request('nama_barang'))->update(
                [
                    'stok' => $stok + request('stok') , 
                ]
            );

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
            $add = Pembelian::where('id' , request('idPembelian'))->update([
            'supplier_id' => request('nama_supplier'), 
            'barang_id' => request('nama_barang'), 
            'stok_pembelian' => request('stok'), 
            'total_biaya' => request('total_biaya'), 
            'tanggal_pembelian' => request('tanggal_pembelian'), 
            'jenis_pembelian' => request('jenis_pembelian'), 
            'total_pembayaran' => request('bayar'), 
            'tipe_pembayaran' => request('metode'), 

            ]);
              
            $totalStok = Pembelian::where('barang_id',request('nama_barang'))->sum('stok_pembelian');           
            Barang::where('id' , request('nama_barang'))->update(
                [
                    'stok' => $totalStok , 
                ]
            );

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

    public function deletePembelian($id)
    {
     
      $data = Pembelian::find($id);
      $stok = Barang::find($data->barang_id);
      Barang::where('id' , $data->barang_id)->update(
          [
              'stok' => $stok->stok - $data->stok_pembelian , 
          ]
      );
      $deltete = Pembelian::where('id' , $id)->update([
        'delete_mark' => 1
      ]);

      if($deltete){
        return response()->json(['status' => 'success']);
      }
    }

}
