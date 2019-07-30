




// FOR SHOP

// $('#posterUpload').on('change', function(){
// 	let image = $("#posterUpload")[0].files[0];
// 	// let image = fd.append(files, fileList);
// 	let formdata = new FormData();
// 	formdata.append('posterUpload', image);
// 	$.ajax({
// 		url: '/shop/upload',
// 		data: formdata,
// 		contentType: true,
// 		processData: true,
// 		type: 'POST',
// 		'success':(data) => {
// 			$('#poster').attr('src', data.file);
// 			$('#posterURL').attr('value', data.file);	// sets posterURL hidden field
// 			if(data.err){
// 				$('#posterErr').show();
// 				$('#posterErr').text(data.err.message);
// 			} else{
// 				$('#posterErr').hide();
// 			}
// 		}
// 	});
// });

// working for one
$('#posterUpload').on('change', function(){
	// let image = $("#posterUpload")[0].files[0];
	let image = document.getElementById("posterUpload").files[0];
	let formdata = new FormData();
	formdata.append('posterUpload', image);
	$.ajax({
		url: '/shop/upload',
		data: formdata,
		contentType: false,
		processData: false,
		type: 'POST',
		'success':(data) => {
			$('#poster').attr('src', data.file);
			$('#posterURL').attr('value', data.file);	// sets posterURL hidden field
			if(data.err){
				$('#posterErr').show();
				$('#posterErr').text(data.err.message);
			} else{
				$('#posterErr').hide();
			}
		}
	});
});

$('#posterUpload2').on('change', function () {
	// let image2 = $("#posterUpload2")[0].files[0];
	let image2 = document.getElementById("posterUpload2").files[1];
    let formdata2 = new FormData();
    formdata2.append('posterUpload2', image2);
    $.ajax({
        url: '/shop/upload2',
		type: 'POST',
		data: formdata2,
		contentType: false,
        processData: false,
        'success': (data) => {
            $('#poster2').attr('src', data.file);
            $('#posterURL2').attr('value', data.file);
            // sets posterURL hidden field
            if(data.err){
                $('#posterErr2').show();
                $('#posterErr2').text(data.err.message);
            } else{                 
				// console.log("I2")
                $('#posterErr2').hide();             
            }         
        }     
    }); 
});

// $('[data-toggle=confirmation]').confirmation({
// 	rootSelector: '[data-toggle=confirmation]',
// });

$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

$(document).on('click', '[data-toggle="lightbox2"]', function (event2) {
	event2.preventDefault();
	$(this).ekkoLightbox();
});

// $('#posterUpload').on('change', function () {
//     let image = $("#posterUpload")[0].files[0];
//     let formdata = new FormData();
//     formdata.append('posterUpload', image);
//     formdata.append('posterUpload2', image);
//     $.ajax({
//         url: '/shop/upload',
//         type: 'POST',
//         data: formdata,
//         contentType: false,
//         processData: false,
//         'success': (data) => {
//             $('#poster').attr('src', data.file);
//             $('#posterURL').attr('value', data.file);
//             $('#posterURL2').attr('value', data.file);
//             // sets posterURL hidden field
//             if(data.err){
//                 $('#posterErr').show();
//                 $('#posterErr').text(data.err.message);
//             } else{                 
//                 $('#posterErr').hide();             
//             }         
//         }     
//     }); 
// });



// Initial caps the title
function initialiseTitle(){
	let title = document.getElementById('title').value;
	let titleArr = [];
	let initTitle = '';
	if(title !== undefined){
		titleArr = title.trim().split(' ');
		for(let i=0; i < titleArr.length; i++){
			initTitle += titleArr[i].charAt(0).toUpperCase() + titleArr[i].slice(1) + ' ';
		}
		console.log(`Initialised title: ${initTitle}`);
		document.getElementById('title').value = initTitle;
	}
}

function ensureOneCheck(checkBoxName, messageId, submitId) {
	const checkBoxes = document.getElementsByName(checkBoxName);
	let checkCount = 0;
	for (let i=0; i < checkBoxes.length; i++){
		if (checkBoxes[i].checked)
			checkCount++;
	}
	if (checkCount === 0){
		document.getElementById(messageId).style.display = 'block';
		document.getElementById(submitId).disabled = true;
		return false;
	} else {
		document.getElementById(messageId).style.display = 'none';
		document.getElementById(submitId).disabled = false;
		return true;
	}
}


// End of shop
