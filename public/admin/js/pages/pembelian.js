function deletePembelian(id){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Konfirmasi Penghapusan Data?",
        text: "Data Yang Dihapus Tidak Dapat Dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({

                url: `/deletePembelian/${id}`,
                type: "GET",
                cache: false,
                data: {
                    id:id , 
                },
                success:function(response){
                    swalWithBootstrapButtons.fire({
                        title: "Berhasil!",
                        text: "Data Pembelian Telah Terhapus",
                        icon: "success"
                      });
                       getPembelian()
                },
                error:function(error){
                    
                  
        
                }
        
            })


          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Batal",
            text: "Data Pembelian Tidak Terhapus",
            icon: "error"
          });
        }
      });




    
}

function getPembelian(){
    $("#tabel_pembelian").dataTable().fnDestroy();

   var table = $('#tabel_pembelian').DataTable({
     processing: true,
     serverSide: true,
     ajax: "/pembelian",
     columns: [
         {data: null,"sortable": false, 
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
           }  },
         {data: 'nama_barang', name: 'nama_barang'},
         {data: 'nama_supplier', name: 'nama_supplier'},
         {data: 'stok_pembelian', name: 'stok_pembelian'},
         {data: 'total_biaya', name: 'total_biaya'},
         {data: 'total_pembayaran', name: 'total_pembayaran'},
         {data: 'tipe_pembayaran', name: 'tipe_pembayaran'},
         {data: 'tanggal_pembelian', name: 'tanggal_pembelian'},
         {data: 'action', name: 'action', orderable: false, searchable: false},
     ]
 });
   }

function showAddPembelian(){
    $('#stok').val('');
    $('#tanggal_pembelian').val('');
    $('#nama_barang').val(0).trigger('change');
    $('#nama_supplier').val(0).trigger('change');
    $('#idPembelian').val('');
    $('#biaya').val('');
    $('#bayar').val('');
    $('#tanggal_pembelian').val('');
    $('#metode').val('1').trigger('change');
    $('#addPembelian').modal('show');
}

function editPembelian(row){
    let data = JSON.parse(row);
    if (data.pelunasan == null) {
      $('#tempo').val('');
    } else {
      $('#tempo').val(data.pelunasan.tempo_piutang);

    }
    $('#idPembelian').val(data.id);
    $('#stok').val(data.stok_pembelian);
    $('#tanggal_pembelian').val(data.tanggal_pembelian);
    $('#biaya').val(formatRupiah(data.total_biaya));
    $('#bayar').val(formatRupiah(data.total_pembayaran));
    $('#metode').val(data.tipe_pembayaran).trigger('change');
    $('#nama_barang').val(data.barang_id).trigger('change');
    $('#nama_supplier').val(data.supplier_id).trigger('change');

    $('#addPembelian').modal('show');

}

function show(){
  let metode = $('#metode').val();
  if (metode == '2') {
    $('#piutang').attr('hidden',false);
  } else {
    $('#piutang').attr('hidden',true);

  }
}

function getBiaya(){
  let nama_barang = $('#nama_barang').val();
  let stok = $('#stok').val();
  $.ajax({

    url: `/getSingleBarang/${nama_barang}`,
    type: "GET",
    cache: false,
    
    processData: false,
    contentType: false,
    success:function(response){
      let sabah = stok*response.harga_beli ; 

        $('#biaya').val(formatRupiah(sabah));
    },
    error:function(error){
        
      

    }

});
}

   $(document).ready(function() {     
    $("#bayar").on("input", function () {
      let value = $(this).val();
      if (value) {
          $(this).val(formatRupiah(value));
      }
  });
  
    getPembelian();
    $("#nama_supplier").select2();
    $("#nama_barang").select2();

    $('#addPembelianButton').click(async function  (e) {
        e.preventDefault();
        $('#addBarang').modal({"backdrop": "static"})
    
        //define variable
        let idPembelian = $('#idPembelian').val();
        let nama_supplier = $('#nama_supplier').val();
        let bayar = $('#bayar').val();
        let biaya = $('#biaya').val();
        let stok = $('#stok').val();
        let tanggal_pembelian = $('#tanggal_pembelian').val();
        let harga = 0 ; 
        let nama_barang = $('#nama_barang').val();
        let metode = $('#metode').val();
        let piutang = $('#tempo').val();
        
       await $.ajax({
    
          url: `/getSingleBarang/${nama_barang}`,
          type: "GET",
          cache: false,
          
          processData: false,
          contentType: false,
          success:function(response){
           
              harga = response.harga_beli ; 
          },
          error:function(error){
              
            

          }

      });

      const cleanInput = (value) => value.replace(/Rp\.?\s?|\.|\s|RP\.?/g, '');
        
      const bayarFix = cleanInput(bayar);
      const beliFix = cleanInput(biaya);

        

        let fix = harga*stok ; 
                  
        let formData = new FormData();
        formData.append("idPembelian", idPembelian);
        formData.append("nama_supplier", nama_supplier);
        formData.append("nama_barang", nama_barang);
        formData.append("stok", stok);
        formData.append("tanggal_pembelian", tanggal_pembelian);
        formData.append("total_biaya", beliFix);
        formData.append("bayar", bayarFix);
        formData.append("metode", metode);
        formData.append("piutang", piutang);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Konfirmasi Perubahan Data?",
            text: "Data Akan Langsung Ditambahkan Pada Tabel!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
    
                    url: `/addPembelian`,
                    type: "POST",
                    cache: false,
                    headers:{
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')} , 
                    processData: false,
                    contentType: false,
                    data: formData,    
                    success:function(response){
                        swalWithBootstrapButtons.fire({
                            title: "Berhasil!",
                            text: "Data Pembelian Telah Dirubah",
                            icon: "success"
                          });
                          $('#idPembelian').val('');
                          $('#nama_supplier').val('');
                          $('#nama_barang').val('');
                          $('#stok').val('');
                          $('#tanggal_pembelian').val('');
                          $('#metode').val('1').trigger('change');
                          $('#tanggal_pembelian').val('');
                        
                          getPembelian()
     
                    },
                    error:function(error){
                      alert(error);
                    }
        
                });
    
    
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              $('#idPembelian').val('');
              $('#nama_supplier').val('');
              $('#nama_barang').val('');
              $('#stok').val('');
              $('#tanggal_pembelian').val('');
              
             
              swalWithBootstrapButtons.fire({
                title: "Batal",
                text: "Data Barang Tidak Ditambah",
                icon: "error"
              });
            }
          });
    
    
    });
 });