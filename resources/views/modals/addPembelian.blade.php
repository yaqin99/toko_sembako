<div class="modal fade none-border" id="addPembelian">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title"><strong id="judulFormPembelian">Tambah Data Pembelian</strong></h4>
                
            </div>
            <div class="modal-body">
                <form id="formTambahPembelian" method="POST">
                    <input type="text" id="idPembelian" name="idPembelian" hidden>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="nama_supplier" class="form-label">Nama Supplier</label>
                            <select id="nama_supplier" name="nama_supplier" class="form-select form-control">
                                <option selected value="0">-Pilih-</option>
                                @foreach ($suppliers as $row)
                                
                                <option value="{{$row->id}}">{{$row->nama_supplier}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label for="nama_barang" class="form-label">Nama Barang</label>
                            <select id="nama_barang" name="nama_barang"  class="form-select form-control">
                                <option selected value="0">-Pilih-</option>
                                @foreach ($barangs as $barang)
                                
                                <option value="{{$barang->id}}">{{$barang->nama_barang}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="control-label">Stok Pembelian</label>
                            <input class="form-control form-white" id="stok" type="number" name="stok" oninput="getBiaya()" >
                        </div>

                        <div class="col-md-6">
                            <label for="jenis_pembelian" class="form-label">Jenis Pembelian</label>
                            <select id="jenis_pembelian" name="jenis_pembelian" class="form-select form-control" onchange="getBiaya()">
                                <option  value="1">Pcs</option>
                                <option  value="2">Karton</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Total Biaya</label>
                            <input class="form-control form-white" id="biaya" type="text" name="biaya" readonly>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">Bayar</label>
                            <input class="form-control form-white" id="bayar" type="text" name="bayar">
                        </div>
                        
                        <div class="col-md-6">
                            <label class="control-label">Tanggal Pembelian</label>
                            <input class="form-control form-white" id="tanggal_pembelian" type="date" name="tanggal_pembelian">
                        </div>
                       
                        <div class="col-md-6">
                            <label for="metode" class="form-label">Metode Pelunasan</label>
                            <select id="metode" name="metode" onchange="show()" class="form-select form-control">
                                <option  value="1">Cash</option>
                                <option  value="2">Credit</option>
                            </select>
                        </div>
                        <div class="col-md-6" id="piutang" hidden>
                            <label class="control-label">Tempo Piutang</label>
                            <input class="form-control form-white" id="tempo" type="date" name="tempo">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-primary waves-effect waves-light save-category" id="addPembelianButton" data-dismiss="modal">Simpan</button>
            </div>
        </div>
    </div>
</div>