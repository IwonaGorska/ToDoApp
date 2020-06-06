$('#idTourDateDetails').datepicker({
    dateFormat: 'dd-mm-yy',
    minDate: '+5d',
    changeMonth: true,
    changeYear: true,
    altField: "#idTourDateDetailsHidden",
    altFormat: "yy-mm-dd"
});