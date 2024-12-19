<div class="row page-titles mx-0">
    
    
    <div class="col-sm-12 p-md-0 justify-content-sm-start mt-2 mt-sm-0 d-flex mt-5">
        <ol class="breadcrumb">
            @if ($pages == 'barang')
            <li class="breadcrumb-item"><button onclick="showAddBarang()" data-bs-toggle="modal" class="btn btn-secondary text-left text-light"><i class="bi bi-plus-circle"></i> Tambah Barang</button></li>
            
            @elseif ($pages == 'supplier')
            <li class="breadcrumb-item"><button onclick="showAddSupplier()" data-bs-toggle="modal" class="btn btn-secondary text-left text-light"><i class="bi bi-plus-circle"></i> Tambah Supplier</button></li>
            @elseif ($pages == 'pembelian')
            <li class="breadcrumb-item"><button onclick="showAddPembelian()" data-bs-toggle="modal" class="btn btn-secondary text-left text-light"><i class="bi bi-plus-circle"></i> Tambah Pembelian</button></li>

            @endif
        </ol>
    </div>
</div>