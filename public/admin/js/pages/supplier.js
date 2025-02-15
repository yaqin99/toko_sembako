function deleteSupplier(id){

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

                url: `/deleteSupplier/${id}`,
                type: "GET",
                cache: false,
                data: {
                    id:id , 
                },
                success:function(response){
                  if(response.status == 'success'){
                    swalWithBootstrapButtons.fire({
                        title: "Berhasil!",
                        text: "Data Supplier Telah Terhapus",
                        icon: "success"
                      });
                       getSupplier()
                  }
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

function getSupplier(){
    $("#tabel_supplier").dataTable().fnDestroy();

   var table = $('#tabel_supplier').DataTable({
     processing: true,
     serverSide: true,
     ajax: "/supplier",
     columns: [
         {data: null,"sortable": false, 
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
           }  },
         {data: 'nama_supplier', name: 'nama_supplier'},
         {data: 'no_hp', name: 'no_hp'},
         {data: 'alamat', name: 'alamat'},
         {data: 'email', name: 'email'},
         {data: 'action', name: 'action', orderable: false, searchable: false},
     ]
 });
   }

function showAddSupplier(){
  $('#nama_supplier_modal').val('');
  $('#no_hp').val('');
  $('#alamat').val('');
  $('#email').val('');
  $('#idSupplier').val('');

    $('#addSupplier').modal('show');
}

function editSupplier(row){
    let data = JSON.parse(row);

    $('#nama_supplier_modal').val(data.nama_supplier);
    $('#no_hp').val(data.no_hp);
    $('#alamat').val(data.alamat);
    $('#email').val(data.email);
    $('#idSupplier').val(data.id);

    $('#addSupplier').modal('show');

}

$(document).ready(function() {     
    getSupplier();

    $('#addSupplierButton').click(function(e) {
        e.preventDefault();
        $('#addSupplier').modal({"backdrop": "static"})
    
        //define variable
        let idSupplier = $('#idSupplier').val();
        var form_data = new FormData($('#formTambahSupplier')[0]);  

             
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
    
                    url: `/addSupplier`,
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
                            text: "Data Supplier Telah Dirubah",
                            icon: "success"
                          });
                          $('#nama_supplier').val('');
                          $('#alamat').val('');
                          $('#no_hp').val('');
                          $('#email').val('');
                        
                          getSupplier()
     
                    },
                    error:function(error){
                        
                      
        
                    }
        
                });
    
    
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              $('#nama_supplier').val('');
              $('#alamat').val('');
              $('#no_hp').val('');
              $('#email').val('');
             
              swalWithBootstrapButtons.fire({
                title: "Batal",
                text: "Data Supplier Tidak Ditambah",
                icon: "error"
              });
            }
          });
    
    
    });
 });