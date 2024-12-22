function deleteEtalase(id){

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

                url: `/deleteEtalase/${id}`,
                type: "GET",
                cache: false,
                data: {
                    id:id , 
                },
                success:function(response){
                    swalWithBootstrapButtons.fire({
                        title: "Berhasil!",
                        text: "Data Etalase Telah Terhapus",
                        icon: "success"
                      });
                       getEtalase()
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

function getEtalase(){
    $("#tabel_etalase").dataTable().fnDestroy();

   var table = $('#tabel_etalase').DataTable({
     processing: true,
     serverSide: true,
     ajax: "/etalase",
     columns: [
         {data: null,"sortable": false, 
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
           }  },
         {data: 'nama_etalase', name: 'nama_etalase'},
         
         {data: 'action', name: 'action', orderable: false, searchable: false},
     ]
 });
   }

function showAddEtalase(){
    $('#stokEtalaseHidden').attr('hidden',true);
    $('#nama_etalase_modal').val('');
    
    $('#addEtalase').modal('show');
}

function editEtalase(row){
    let data = JSON.parse(row);

    $('#stokEtalaseHidden').attr('hidden',false);
    $('#nama_etalase_modal').val(data.nama_etalase);
    
    $('#addEtalase').modal('show');

}

   $(document).ready(function() {     
    getEtalase();

    $('#addEtalaseButton').click(function(e) {
        e.preventDefault();
        $('#addEtalase').modal({"backdrop": "static"})
    
        //define variable
        let idBarang = $('#idEtalase').val();
        var form_data = new FormData($('#formTambahEtalase')[0]);  

             
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
    
                    url: `/addEtalase`,
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
                          $('#nama_etalase').val('');
                        
                          getEtalase()
     
                    },
                    error:function(error){
                        
                      
        
                    }
        
                });
    
    
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
                $('#nama_etalase').val('');

              
             
              swalWithBootstrapButtons.fire({
                title: "Batal",
                text: "Data Etalase Tidak Ditambah",
                icon: "error"
              });
            }
          });
    
    
    });
 });