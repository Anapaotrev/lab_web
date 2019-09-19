
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$('#escribe_reseña').on('click', function(event) {
  if ($('#seccion_comentario').hasClass('hidden')) {
    $('#seccion_comentario').removeClass('hidden');
    $('#escribe_reseña').text('Dejar de escribir reseña');
  } else {
    $('#seccion_comentario').addClass('hidden');
    $('#escribe_reseña').text('Escribe una reseña');
  }
})

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url : 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type : 'GET',
  dataType : 'xml',
  success : function(data) {
    let comments = '';

    $(data).find('comment').each(function() {
      comments += '<div>';
      const info = `<p class="nombre">
                      ${$(this).find('name').text()}
                      <span class="email">${$(this).find('name').attr('email')}</span>
                    </p>`;
      const review = `<p class="review">${$(this).find('text').text()}</p>`;
      const date = `<span class="date">${$(this).find('date').text()}</span>`;
      const stars = getStarsSpans($(this).find('stars').text())
      comments += info + stars + date + review + '</div>';
    });

    $('#seccion_reviews').append(comments);
  },
  error : function(errorMsg) {
      console.log(errorMsg);
  }
});

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#btn-publicar').on('click', function(event) {
  if ($('#nombre').val() != "" && $('#comentario').text() != "") {
    $('#seccion_comentario').toggleClass('hidden');
    $('#error_comment').addClass("hidden");

    let newComment = '<div class="review">'
    const info = `<p class="nombre">
                    ${$('#nombre').val()}
                    <span class="email">${$('#email').val()}</span>
                  </p>`;
    const review = `<p>${$('#comentario').text()}</p>`;
    const stars = getStarsSpans($('input[name="rating"]:checked')[0].value);
    const date = `<span class="date">hace unos segundos</span>`;
    newComment += info + stars + date + review + '</div>';
  
    $('#seccion_reviews').append(newComment);
    $('#escribe_reseña').text('Escribe una reseña');
    cleanComment();
  } else {
    $('#error_comment').removeClass("hidden");
  }
})

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').on('click', function(event) {
  cleanComment();
})

function cleanComment() {
  $('#seccion_comentario').find('input[type=text]').val('');
  $('input[name="rating"]').prop('checked', false);
  $('#comentario').text('');
}

/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
