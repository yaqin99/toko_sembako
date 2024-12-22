<div class="modal fade none-border" id="addSupplier">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title"><strong id="judulFormSupplier">Tambah Data Supplier</strong></h4>
            </div>
            <div class="modal-body">
                <form id="formTambahSupplier" method="POST">
                    <input type="text" id="idSupplier" name="idSupplier" hidden>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">Nama Supplier</label>
                            <input class="form-control form-white" id="nama_supplier_modal" type="text" name="nama_supplier_modal">
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Alamat</label>
                            <input class="form-control form-white" id="alamat" type="text" name="alamat">
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Nomer Handphone</label>
                            <input class="form-control form-white" id="no_hp" type="text" name="no_hp">
                        </div>
                        
                        <div class="col-md-6">
                            <label class="control-label">Email</label>
                            <input class="form-control form-white" id="email" type="email" name="email">
                        </div>
                        
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary waves-effect waves-light save-category" id="addSupplierButton" data-dismiss="modal">Simpan</button>
            </div>
        </div>
    </div>
</div>