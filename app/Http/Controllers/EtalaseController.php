<?php

namespace App\Http\Controllers;

use App\Models\Etalase;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class EtalaseController extends Controller
{
    public function index(Request $request)
    {
        $pages = 'etalase' ; 
        if ($request->ajax()) {
            
            $data = Etalase::where('delete_mark' , 0)->get();
            
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('nama_etalase', function($row){
                    return $row->nama_etalase;})
                                     
                    ->addColumn('action', function($row){
                            $btn = '
                            <div class="btn-group">
                            <a onclick=\'editEtalase(`'.$row.'`)\' class="edit btn btn-warning text-light btn-sm" data-bs-toggle="modal" data-bs-target="#editGuru">
                            <i class="bi bi-pencil-fill" ></i>
                            </a>
                            
                            <a href="javascript:void(0)" onclick=\'deleteEtalase(`'.$row->id.'`)\' class="edit btn btn-danger text-light btn-sm"><i class="bi bi-trash3-fill"></i></a>
                            
                            </div>
                            
                            ';
                            
     
                             return $btn;
                         
                           
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('pages.etalase' , [
            'pages' => $pages , 
        ]);
    }

    public function addEtalase(Request $request)
    {
     
        if(request('idEtalase') == ''){
            $add = Etalase::create([
                'nama_etalase' => request('nama_etalase_modal'), 
                 
              ]);
              
        } else {
            $add = Etalase::where('id' , request('idEtalase'))->update([
                'nama_etalase' => request('nama_etalase_modal'), 
               

              ]);
              
        }
            
        
        
    }

    public function deleteEtalase($id)
    {
     
      $data = Etalase::find($id);
      $deltete = Etalase::where('id' , $id)->update([
        'delete_mark' => 1
      ]);

      if($deltete){
        return response()->json(['status' => 'success']);
      }
    }
    
}
