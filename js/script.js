$(document).ready(function(){
  // Richiama la lista e la stampa a schermo
  getList();

  // Prende il valore dell'input e lo passa all'API
  $('#submit-item').click(function(){
    addToList($('#input-item').val());
  });

  // Cancella l'item se schiaccio il bottone X
  $(document).on('click','.delete-item',function(){
    var idItem = $(this).parent().attr('data-id');
    deleteItem(idItem);
  });

  // Funzione che passa all'api il valore dell'input e ristampa la lista aggiornata
  // Accetta: inputValue, stringa
  // Return: niente, stampa a schermo la lista aggiornata
  function addToList(inputItem){
    if (inputItem > 0) {
      $.ajax(
        {
          url: 'http://157.230.17.132:3019/todos/',
          method: 'POST',
          data: {
            text: inputItem
          },
          success: function(dataResponse){
            getList();
          },
          error: function(){
            alert('Non è possibile aggiungere cose alla lista!')
          }
        }
      );
    } else {
      alert('Devi scrivere qualcosa prima di fare invio!')
    }
  };

  // Funzione che richiama la lista delle cose da cose da fare e la stampa
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

  // Funzione che stampa una lista di cose da cose da fare
  // Accetta: arrayList, array della lista delle cose da fare
  // Return: niente, stampa a schermo utilizzando Handlebars
  function printList(arrayList){
    // Pulisce la lista, prima di stamparla
    $('.todo-list').text('');
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

  // Funzione che cancella gli item e ristampa la lista aggiornata
  // Accetta: id, id dell'item da cancellare
  // Return: niente, stampa a schermo la lista aggiornata
  function deleteItem(id){
    $.ajax(
      {
        url: 'http://157.230.17.132:3019/todos/' + id,
        method: 'DELETE',
        success: function(dataResponse){
          getList();
        },
        error: function(){
          alert("Non è possibile cancellare l'elemento!")
        }
      }
    );
  }


});
