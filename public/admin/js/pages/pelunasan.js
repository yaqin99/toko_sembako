function deleteBarang(id){

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

                url: `/deleteBarang/${id}`,
                type: "GET",
                cache: false,
                data: {
                    id:id , 
                },
                success:function(response){
                    swalWithBootstrapButtons.fire({
                        title: "Berhasil!",
                        text: "Data Barang Telah Terhapus",
                        icon: "success"
                      });
                       getBarang()
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
            text: "Data Barang Tidak Terhapus",
            icon: "error"
          });
        }
      });




    
}

function getPelunasan(){
    $("#tabel_piutang").dataTable().fnDestroy();

   var table = $('#tabel_piutang').DataTable({
     processing: true,
     serverSide: true,
     ajax: "/piutang",
     columns: [
         {data: null,"sortable": false, 
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
           }  },
         {data: 'supplier', name: 'supplier'},
         {data: 'tempo_piutang', name: 'tempo_piutang'},
         {data: 'jumlah_piutang', name: 'jumlah_piutang'},
         {data: 'total_pembayaran', name: 'total_pembayaran'},
         {data: 'sisa_piutang', name: 'sisa_piutang'},
         {data: 'tanggal_pembayaran', name: 'tanggal_pembayaran'},
         {data: 'status', name: 'status'},
         {data: 'action', name: 'action', orderable: false, searchable: false},
     ]
 });
   }

function showAddBarang(){
    $('#stokBarangHidden').attr('hidden',true);
    $('#stok').val(0);
    $('#idBarang').val('');

    $('#addBarang').modal('show');
}

function editBarang(row){
    let data = JSON.parse(row);

    $('#stokBarangHidden').attr('hidden',false);
    $('#nama_barang_tambah').val(data.nama_barang);
    $('#harga_beli').val(data.harga_beli);
    $('#stok').val(data.stok);
    $('#idBarang').val(data.id);

    $('#addBarang').modal('show');

}

   $(document).ready(function() {     
    getPelunasan();

    $('#addBarangButton').click(function(e) {
        e.preventDefault();
        $('#addBarang').modal({"backdrop": "static"})
    
        //define variable
        let idBarang = $('#idBarang').val();
        var form_data = new FormData($('#formTambahBarang')[0]);  

             
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
    
                    url: `/addBarang`,
                    type: "POST",
                    cache: false,
                    headers:{
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')} , 
                    processData: false,
                    contentType: false,
                    data: form_data,    
                    success:function(response){
                        swalWithBootstrapButtons.fire({
                            title: "Berhasil!",
                            text: "Data Barang Telah Dirubah",
                            icon: "success"
                          });
                          $('#nama_barang').val('');
                          $('#harga_beli').val('');
                        
                          getBarang()
     
                    },
                    error:function(error){
                        
                      
        
                    }
        
                });
    
    
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
                $('#nama_barang').val('');
                $('#harga_beli').val('');
              
             
              swalWithBootstrapButtons.fire({
                title: "Batal",
                text: "Data Barang Tidak Ditambah",
                icon: "error"
              });
            }
          });
    
    
    });
 });