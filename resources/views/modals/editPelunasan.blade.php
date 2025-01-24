<div class="modal fade none-border" id="modalPelunasan">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title"><strong>Form Pelunasan Piutang</strong></h4>
            </div>
            <div class="modal-body">
                <form id="formPelunasanPiutang" method="POST">
                    <input type="text" id="idPelunasan" name="idPelunasan" hidden>
                    <input type="text" id="idPembeli" name="idPembeli" hidden>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">Tempo Piutang</label>
                            <input class="form-control form-white" id="tempo_piutang" type="date" name="tempo_piutang">
                        </div>
                       
                        <div class="col-md-6">
                            <label class="control-label">Jumlah Piutang</label>
                            <input class="form-control form-white" id="jumlah_piutang" type="text" name="jumlah_piutang" readonly>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Total Pembayaran</label>
                            <input class="form-control form-white" id="total_pembayaran_piutang" type="text" name="total_pembayaran_piutang">
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Sisa Piutang</label>
                            <input class="form-control form-white" id="sisa" type="text" name="sisa" readonly>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Tanggal Pembayaran</label>
                            <input class="form-control form-white" id="tanggal_pembayaran" type="date" name="tanggal_pembayaran">
                        </div>
                        
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary waves-effect waves-light save-category" id="pelunasanButton" data-dismiss="modal">Simpan</button>
            </div>
        </div>
    </div>
</div>