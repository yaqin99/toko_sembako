<div class="modal fade none-border" id="addBarang">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><strong id="judulFormBarang">Tambah Data Barang</strong></h4>
            </div>
            <div class="modal-body">
                <form id="formTambahBarang" method="POST">
                    <input type="text" id="idBarang" name="idBarang" hidden>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">Nama Barang</label>
                            <input class="form-control form-white" id="nama_barang" type="text" name="nama_barang">
                        </div>
                       
                        <div class="col-md-6">
                            <label class="control-label">Harga Beli</label>
                            <input class="form-control form-white" id="harga_beli" type="number" name="harga_beli">
                        </div>
                        <div class="col-md-6" id="stokBarangHidden" hidden>
                            <label class="control-label">Stok Barang</label>
                            <input class="form-control form-white" id="stok" type="number" name="stok">
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