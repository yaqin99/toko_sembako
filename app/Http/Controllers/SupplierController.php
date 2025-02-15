<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'supplier' ; 
        if ($request->ajax()) {
            
            $data = Supplier::where('delete_mark' , 0)->get();
            
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('nama_supplier', function($row){
                    return $row->nama_supplier;})
                    ->addColumn('no_hp', function($row){
                    return $row->no_hp;})
                    ->addColumn('alamat', function($row){
                    return $row->alamat;})                  
                    ->addColumn('email', function($row){
                    return $row->email;})                  
                    ->addColumn('action', function($row){
                            $btn = '
                            <div class="btn-group">
                            <a onclick=\'editSupplier(`'.$row.'`)\' class="edit btn btn-warning text-light btn-sm" data-bs-toggle="modal" data-bs-target="#editGuru">
                            <i class="bi bi-pencil-fill" ></i>
                            </a>
                            
                            <a href="javascript:void(0)" onclick=\'deleteSupplier(`'.$row->id.'`)\' class="edit btn btn-danger text-light btn-sm"><i class="bi bi-trash3-fill"></i></a>
                            
                            </div>
                            
                            ';
                            
     
                             return $btn;
                         
                           
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('pages.supplier' , [
            'pages' => $pages , 
        ]);
    }

    
    public function addSupplier(Request $request)
    {
     
        if(request('idSupplier') == ''){
            $add = Supplier::create([
                'nama_supplier' => request('nama_supplier_modal'), 
                'alamat' => request('alamat'), 
                'no_hp' => request('no_hp'), 
                'email' => request('email'), 
              ]);
              
        } else {
            $add = Supplier::where('id' , request('idSupplier'))->update([
                'nama_supplier' => request('nama_supplier_modal'), 
                'alamat' => request('alamat'), 
                'no_hp' => request('no_hp'), 
                'email' => request('email'), 
              ]);
              
        }
            
        
        
    }

    public function deleteSupplier($id)
    {
     
      $data = Supplier::find($id);
      $deltete = Supplier::where('id' , $id)->update([
        'delete_mark' => 1
      ]);

      if($deltete){
        return response()->json(['status' => 'success']);
      }
    }

    
}
