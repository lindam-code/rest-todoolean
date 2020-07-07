$(document).ready(function(){
  // Richiama la lista e la stampa a schermo
  getList();

  // Funzione che richiama la lista delle cose da cose da fare
  // e la stampa
  function getList(){
    $.ajax(
      {
        url: 'http://157.230.17.132:3019/todos/',
        method: 'GET',
        success: function(dataResponse){
          printList(dataResponse)
        },
        error: function(){
          alert('La chiamata non è andata a buonfine!')
        }
      }
    );
  };

  // Funzione che richiama e stampa una lista di cose da cose da fare
  // Accetta: arrayList, array della lista delle cose da fare
  // Return: niente, stampa a schermo utilizzando Handlebars
  function printList(arrayList){
    // Preparo template di Handelbars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < arrayList.length; i++) {
      context = {
        listItem: arrayList[i].text,
        itemId: arrayList[i].id
      };
      var html = template(context);
      $('.todo-list').append(html);
    };
  };

});
