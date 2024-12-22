<div class="modal fade none-border" id="addEtalase">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title"><strong id="judulFormEtalase">Tambah Data Etalase</strong></h4>
            </div>
            <div class="modal-body">
                <form id="formTambahEtalase" method="POST">
                    <input type="text" id="idEtalase" name="idEtalase" hidden>
                    <div class="row">
                        <div class="col-md-12">
                            <label class="control-label">Nama Etalase</label>
                            <input class="form-control form-white" id="nama_etalase_modal" type="text" name="nama_etalase_modal">
                        </div>
                       
                       
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary waves-effect waves-light save-category" id="addEtalaseButton" data-dismiss="modal">Simpan</button>
            </div>
        </div>
    </div>
</div>