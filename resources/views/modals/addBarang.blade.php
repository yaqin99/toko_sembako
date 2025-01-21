<div class="modal fade none-border" id="addBarang">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title"><strong id="judulFormBarang">Tambah Data Barang</strong></h4>
            </div>
            <div class="modal-body">
                <form id="formTambahBarang" method="POST">
                    <input type="text" id="idBarang" name="idBarang" hidden>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">Nama Barang</label>
                            <input class="form-control form-white" id="nama_barang_tambah" type="text" name="nama_barang_tambah">
                        </div>
                       
                        <div class="col-md-6">
                            <label class="control-label">Harga Beli</label>
                            <input class="form-control form-white" id="harga_beli" type="text" name="harga_beli">
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Harga Jual</label>
                            <input class="form-control form-white" id="harga_jual" type="text" name="harga_jual">
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Harga Eceran</label>
                            <input class="form-control form-white" id="harga_eceran" type="text" name="harga_eceran">
                        </div>
                        <div class="col-md-6" id="stokBarangHidden" hidden>
                            <label class="control-label">Stok Barang</label>
                            <input class="form-control form-white" id="stok" type="number" name="stok">
                        </div>
                        <div class="col-md-6">
                            <label for="satuan" class="form-label">Satuan</label>
                            <select id="satuan" name="satuan"  class="form-select form-control">
                                <option selected value="0">-Pilih-</option>
                                <option value="1">Pcs</option>
                                <option value="2">Karton</option>                              
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="etalase" class="form-label">Kategori</label>
                            <select id="etalase" name="etalase"  class="form-select form-control">
                                <option selected value="0">-Pilih-</option>
                                @foreach ($etalase as $row)
                                
                                <option value="{{$row->id}}">{{$row->nama_etalase}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary waves-effect waves-light save-category" id="addBarangButton" data-dismiss="modal">Simpan</button>
            </div>
        </div>
    </div>
</div>