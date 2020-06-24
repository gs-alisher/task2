$(document).ready(function () {
    $('.phone-group').on('click', '.add-phone', {text: 'Phone number',position: 'top'}, addPhoneFunction);
    $('.phone-group').on('click', '.remove-phone', removePhoneFunction); 
    
    
    $('.email-group').on('click', '.add-phone', {text: 'Email', position: 'top'}, addPhoneFunction);
    $('.email-group').on('click', '.remove-phone', removePhoneFunction); 

    $('#accordion').on('click', '.phone-group .add-phone-bottom', {text: 'Phone number',position: 'bottom'}, addPhoneFunction);
    $('#accordion').on('click', '.phone-group .remove-phone-bottom', removePhoneFunction); 
    
    $('#accordion').on('click', '.email-group .add-phone-bottom', { text: 'Email',position: 'bottom'}, addPhoneFunction);
    $('#accordion').on('click', '.email-group .remove-phone-bottom', removePhoneFunction);

    $('#accordion').on('click', '.email-group .edit-phone-bottom', editPhoneFunction);
    $('#accordion').on('click', '.phone-group .edit-phone-bottom', editPhoneFunction);

    
    $('#accordion').on('click', '.edit-name', editNameFunction);
    $('#accordion').on('click', '.save-name', saveNameFunction);
    $('#accordion').on('click', '.remove-contact', removeContactFunction);

    $('#addContact').on('click', addContactFunction)

    $('#accordion').on('click', '.btn-save', saveContactFunction)
    
    
    $('.phone-number').on('input', function() {
        $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''))
    });
    
    $('.email-group').on('change', '.email', validateEmail);
    
    
    
    $('#search').on('keyup', searchfunction)
    
    $('#accordion').on('click', '.open-carousel-btn', x=>{
        let target = $(x.target).attr('data-target');
        if($(target).hasClass('show')){
            $(x.target).html('Open')
        } else {
            $(x.target).html('Close')
        }
    })
    

    function addPhoneFunction(x) {
        x.preventDefault();
        let className = '';
        if(x.data.text == 'Email'){
            className = 'email'
        } else {
            className = 'phone-number'
        }
        if (x.data.position == 'top') {
            let element = '<div class="input-group mb-3"><input type="tel" type="tel" class="form-control ' + className +'" placeholder="' + x.data.text + '" data-number=""><div class="input-group-append"><button class="btn btn-danger remove-phone" type="button">Remove</button></div></div>'
            $(this).before(element);
        } else {
            let element = '<div class="input-group mb-3"><input type="tel" type="tel" class="form-control ' + className + '" placeholder="' + x.data.text + '" data-number=""><div class="input-group-append"><button class="btn btn-danger remove-phone-bottom" type="button">Remove</button></div></div>'
            $(this).before(element);
        }

        $(this).parent().parent().children('.btn-save').removeAttr('disabled')

    }

    function removePhoneFunction(x) {
        x.preventDefault();
        $(this).parent().parent().remove();

    }

    function editPhoneFunction(x) {
        x.preventDefault();
        $(this).parent().prev().removeAttr('disabled');
        $(this).remove();
        $('.btn-save').removeAttr('disabled')
    }

    function addContactFunction(x) {
        x.preventDefault();
        let name = $('#name').val();
        let surname = $('#surname').val();

        if (name != '') {
            let number = $('.card').length - 1;
            let cardItem = $('.card')[number];
            let dataContact = +$(cardItem).attr('data-contact') + 1 || 1;
            let header = '<div class="card-header"><h2 class="mb-0"><div class="input-group"><input type="text" class="form-control" placeholder="Name" value="' + name + ' ' + surname + '" disabled><div class="input-group-append"><button class="btn btn-secondary edit-name" type="button">Edit</button><button class="btn btn-danger remove-contact" type="button">Remove</button></div></div><button class="btn btn-outline-secondary d-block w-100 mt-3 open-carousel-btn" data-toggle="collapse" data-target="#collapse' + dataContact + '" aria-expanded="true" aria-controls="collapse' + dataContact + '">Open</button></h2></div>';
            let phoneNumber = [];
            
            $('.phone-number').each((index, item) => {
                let input = '<div class="input-group mb-3"><input type="tel" class="form-control" placeholder="Phone number" value="' + $(item).val() + '" disabled><div class="input-group-append"><button class="btn btn-secondary edit-phone-bottom" type="button">Edit</button></div></div>'
                phoneNumber.push(input);
            })

            let emails = [];

            $('.email').each((index, item) => {
                let input = '<div class="input-group mb-3"><input type="email" class="form-control" placeholder="Email" value="' + $(item).val() + '" disabled><div class="input-group-append"><button class="btn btn-secondary edit-phone-bottom" type="button">Edit</button></div></div>'
                emails.push(input);
            })

            let body = '<div id="collapse' + dataContact +'" class="collapse" aria-labelledby="heading' + dataContact +'" data-parent="#accordion"><div class="card-body row"><div class="col-12 col-md-6 phone-group">' + phoneNumber.join('') + '<button class="btn btn-info add-phone-bottom mb-3">Add phone number</button></div><div class="col-12 col-md-6 email-group">  ' + emails.join('') + '<button class="btn btn-info add-phone-bottom mb-3">Add email number</button></div><button class="btn btn-success col-12 mt-3 btn-save" disabled>Save changes</button></div></div>'


            $('#accordion').append('<div class="card" data-contact="' + dataContact + '">' + header + body + '</div>');
        }
        $('#addContact').prev('form').find('input').val('')

    }

    function saveContactFunction(x) {
        x.preventDefault();
        let inputGroup = $(this).parent('.card-body').children('.phone-group, .email-group').children('.input-group');
        inputGroup.children('input').prop('disabled', true)
        inputGroup.children('.input-group-append').html('<button class="btn btn-secondary edit-phone-bottom" type="button">Edit</button>')
        $(this).prop('disabled', true)
    }

    function validateEmail (x)  {
        let email = x.target.value;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let answer
        if (!emailReg.test(email)) {    
            answer = false 
            
        } else {
            answer = true 
        }
        answer == false ? $(x.target).addClass('is-invalid') : $(x.target).removeClass('is-invalid');     
    }

    function searchfunction () {
        var val = $.trim(this.value).toLowerCase();
        if (val === "")
            $('.card h2').parent().parent().show();
        else {
            $('.card h2 input').map((index, item) => {
                let inputVal = $(item).val().toLowerCase();
                $(item).parent().parent().parent().parent().hide()
                inputVal.indexOf(val) == 0 ? $(item).parent().parent().parent().parent().show() : $(item).parent().parent().parent().parent().hide()
            })
        }
    }

    function editNameFunction () {
        $(this).parent().prev().removeAttr('disabled');
        $(this).removeClass('btn-outline-secondary edit-name').addClass('btn-success save-name').html('Save')
    }
    function saveNameFunction () {
        $(this).parent().prev().prop('disabled', true);
        $(this).removeClass('btn-success save-name').addClass('btn-secondary edit-name').html('Edit')
    }
    function removeContactFunction () {
        $(this).parent().parent().parent().parent().parent().remove();
    }

});