
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

   function formatRupiah2(angka) {
    // Pastikan angka adalah string
    let number_string = angka.toString().replace(/[^,\d]/g, ""),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }
  
    return "RP. " + rupiah + (split[1] !== undefined ? "," + split[1] : "");
  }
  
  

function pelunasan(row){
    let data = JSON.parse(row);
  console.log(data)
    $('#tempo_piutang').val(data.tempo_piutang);
    $('#jumlah_piutang').val(formatRupiah2(data.jumlah_piutang));
    $('#total_pembayaran_piutang').val(formatRupiah2(data.total_pembayaran));
    $('#sisa').val(formatRupiah2(data.sisa_piutang));
    $('#tanggal_pembayaran').val(data.tanggal_pembayaran);
    $('#idPelunasan').val(data.id);
    $('#idPembeli').val(data.pembelian_id);

    $('#modalPelunasan').modal('show');

}

   $(document).ready(function() { 
    $("#bayar").on("input", function () {
      let value = $(this).val();
      if (value) {
          $(this).val(formatRupiah2(value));
      }
    })    
    $("#total_pembayaran_piutang").on("input", function () {
      let value = $(this).val();
      if (value) {
          $(this).val(formatRupiah2(value));
      }
    })    

    
    getPelunasan();

    $('#pelunasanButton').click(function(e) {
        e.preventDefault();
        $('#modalPelunasan').modal({"backdrop": "static"})
    
        //define variable
        let ju = $('#jumlah_piutang').val() ; 
        let to = $('#total_pembayaran_piutang').val() ; 
        let si = $('#sisa').val() ; 
        const cleanInput2 = (value) => value.replace(/Rp\.?\s?|\.|\s|RP\.?/g, '');
        var form_data = new FormData($('#formPelunasanPiutang')[0]);  
        let jumlah = cleanInput2(ju);
        let total = cleanInput2(to);
        let sisa = cleanInput2(si);
       
        
        form_data.append("jumlah_piutang", jumlah);
        form_data.append("total_pembayaran", total);
        form_data.append("sisa_piutang", sisa);
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
    
                    url: `/pelunasan`,
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
                            text: "Data Pelunasan Piutang Telah Dirubah",
                            icon: "success"
                          });
                         $('#formPelunasanPiutang')[0].reset();

                         getPelunasan();
     
                    },
                    error:function(error){
                        
                      
        
                    }
        
                });
    
    
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              $('#formPelunasanPiutang')[0].reset();

              
             
              swalWithBootstrapButtons.fire({
                title: "Batal",
                text: "Data Piutang Tidak Dirubah",
                icon: "error"
              });
            }
          });
    
    
    });
 });