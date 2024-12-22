<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Etalase;
use App\Models\User;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;



class BarangController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'barang' ; 
        $etalase = Etalase::all();

        if ($request->ajax()) {
            
            $data = Barang::with('etalase')->get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('nama_barang', function($row){
                    return $row->nama_barang;})
                    ->addColumn('harga_beli', function($row){
                    return $row->harga_beli;})
                    ->addColumn('harga_jual', function($row){
                    return $row->harga_jual;})
                    ->addColumn('stok', function($row){
                    return $row->stok;})                  
                    ->addColumn('kategori', function($row){
                    return $row->etalase->nama_etalase;})                  
                    ->addColumn('action', function($row){
                            $btn = '
                            <div class="btn-group">
                            <a onclick=\'editBarang(`'.$row.'`)\' class="edit btn btn-warning text-light btn-sm" data-bs-toggle="modal" data-bs-target="#editGuru">
                            <i class="bi bi-pencil-fill" ></i>
                            </a>
                            
                            <a href="javascript:void(0)" onclick=\'deleteBarang(`'.$row->id.'`)\' class="edit btn btn-danger text-light btn-sm"><i class="bi bi-trash3-fill"></i></a>
                            
                            </div>
                            
                            ';
                            
     
                             return $btn;
                         
                           
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('pages.barang' , [
            'pages' => $pages , 
            'etalase' => $etalase , 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getBarang()
    {
        $data = User::with('Barang');
        
        return response()->json($data);

    }

  
    /**
     * Store a newly created resource in storage.
     */
    public function addBarang(Request $request)
    {
     
        if(request('idBarang') == ''){
            $add = Barang::create([
                'nama_barang' => request('nama_barang_tambah'), 
                'harga_beli' => request('harga_beli'), 
                'harga_jual' => request('harga_jual'), 
                'stok' => 0, 
                'etalase_id' => request('etalase'), 
              ]);
              
        } else {
            $add = Barang::where('id' , request('idBarang'))->update([
                'nama_barang' => request('nama_barang_tambah'), 
                'harga_beli' => request('harga_beli'), 
                'harga_jual' => request('harga_jual'), 

                'stok' => request('stok'), 
                'etalase_id' => request('etalase'), 

              ]);
              
        }
            
        
        
    }

    public function deleteBarang($id)
    {
     
      $data = Barang::find($id);
      $deltete = Barang::where('id' , $id)->delete();
    }

   
}
