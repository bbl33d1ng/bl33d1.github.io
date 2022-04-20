var produktet = {};
$(function () {
    calculateDetails();
    setSasiaDefault();
    $('#txtArtikulli').change(function() {
        $('#txtSasia').text($(this).find(":selected").text());
      });

    $('#btnAdd').on('click', function () {
        setSasiaDefault();
        var name, country, id;
        id = $("#txtArtikulli").val();
        name = $("#txtSasia").val();
        country = $("#txtQmimi").val();

        //var edit = "<a class='edit' href='JavaScript:void(0);' >Edit</a>";
        var del = "<a class='delete' href='JavaScript:void(0);'><img style='max-width:20px; max-height:20px;' src='/images/minusWhite.png'></a>";

        if (id == "") {
            alert("Sheno artikullin!");
        } else {
            var table = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + country + "</td><td>"+(parseFloat(name) * parseFloat(country))+"</td><td>" + del + "</td></tr>";
            $("#tblCustomers").append(table);
        }
        id = $("#txtArtikulli").val("");
        name = $("#txtSasia").val("");
        country = $("#txtQmimi").val("");

        calculateDetails();
        

        Clear();
    });

    function calculateDetails(){
        //iterating through table tds with each method and 
        var totalSasia = 0.0, totalVlera = 0.0;
        $("#tblCustomers").find('tr').each(function (i, el){
            var $tds = $(this).find('td'),
            artikulli = $tds.eq(0).text(),
            sasia = parseFloat($tds.eq(1).text()),
            qmimi = parseFloat($tds.eq(3).text());

            if(!isNaN(sasia) && !isNaN(qmimi)){
                totalSasia += sasia;
                totalVlera += qmimi;   
            }



            console.log(i +": " +artikulli + sasia + qmimi);
        })
        var pagesa = (totalVlera).toFixed(2);;
        var tvsh18 = ((pagesa / 118) * 100).toFixed(2);;
        var vleraPaTvsh = (pagesa - tvsh18).toFixed(2);;

        $("#pakoTxt").text(totalSasia);
        $("#tvshTxt").text(vleraPaTvsh + "€");
        $("#paTvshTxt").text( tvsh18 + "€");
        $("#pagesaTxt").text(pagesa + "€");

        

        console.log(totalVlera +"|"+totalSasia);
    }

    $('#btnUpdate').on('click', function () {
        var name, country, id;
        id = $("#txtArtikulli").val();
        name = $("#txtSasia").val();
        country = $("#txtQmimi").val();

        $('#tblCustomers tbody tr').eq($('#hfRowIndex').val()).find('td').eq(1).html(name);
        $('#tblCustomers tbody tr').eq($('#hfRowIndex').val()).find('td').eq(2).html(country)

        $('#btnAdd').show();
        $('#btnUpdate').hide();
        Clear();
    });

    $("#tblCustomers").on("click", ".delete", function (e) {
            $(this).closest('tr').remove();
            calculateDetails();
    });

    $('#btnClear').on('click', function () {
        Clear();
    });

    $("#tblCustomers").on("click", ".edit", function (e) {
        var row = $(this).closest('tr');
        $('#hfRowIndex').val($(row).index());
        var td = $(row).find("td");
        $('#txtArtikulli').val($(td).eq(0).html());
        $('#txtSasia').val($(td).eq(1).html());
        $('#txtQmimi').val($(td).eq(2).html());
        $('#btnAdd').hide();
        $('#btnUpdate').show();
    });
});
function Clear() {
    $("#txtArtikulli").val("");
    $("#txtSasia").val("");
    $("#txtQmimi").val("");
    $("#hfRowIndex").val("");
}

function getPrice(){
    setSasiaDefault();
    var selectedProd = $("#txtArtikulli").val();
    for (const [key, value] of Object.entries(produktet)) {
        //console.log(key, value);
        if(selectedProd === key){
            $("#txtQmimi").val(value);
        }
      }
}

function setSasiaDefault(){
    var sasia = $("#txtSasia").val();
    if(sasia == ''){
        $("#txtSasia").val("1");
    }
}

function selectSasia(){
    $("#txtSasia").select();
}

function selectQmimi(){
    $("#txtQmimi").select();
}

function selectArtikulli(){
    $("#txtArtikulli").select();
}