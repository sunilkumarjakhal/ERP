/**
 * Created by ANUBHAV on 28-Sep-17.
 */

$(document).ready(function($) {


var alertBox = $("<div>").attr('id',"dialog");
    $('body').append(alertBox);





    
    alertBox.dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 400
        },
        hide: {
            effect: "fadeOut",
            duration: 400
        }
    });


    //   var socket = io('http://erp.openode.io/');
    var socket = io();

    socket.emit('students',{});

    socket.on('new_notification_text', function(res){

        //console.log(res);


        var msg=$('<a>').text(res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });

        $('#notifications').prepend($('<li>').append(msg));
    });
    socket.on('new_notification_file', function(res){
        console.log(res);

        var msg=$('<a>').attr('href',res.link+"/"+res.fileName).text(res.notification_heading);
        $('#notifications').prepend($('<li>').append(msg));
    });







var teacherList=$('#teacherList');




    $.get('/myClass',function(data){
        console.log(data);
          socket.emit(data,{});
    })
 
  
     
  
  
    

    socket.on('new_text_from_teacher', function(res){

      console.log(res);
      var msg=$('<a>').html('<b>'+res.target+' : </b>'+res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });
        teacherList.prepend($('<li>').append(msg));
    });

    socket.on('new_file_from_teacher', function(res){
      console.log(res);

      var msg=$('<a>').attr('href',res.link+"/"+res.fileName).html('<b>'+res.from+' : </b>'+res.notification_heading);
      teacherList.prepend($('<li>').append(msg));
        
    });


});

