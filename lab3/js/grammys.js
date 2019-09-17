$.ajax({
    url : 'https://anapaotrev.github.io/lab_web/lab3/data/grammys.json',
    type : 'GET',
    dataType : 'json',
    success : function(data) {
        let selectOptions = '';
        let options = data.fields;

        for (let i = 0; i < options.length; i++) {
            selectOptions += `<option value="${i}"> ${options[i].field}</option>`
        }

        $('#category_types').append(selectOptions);
    },
    error : function(errorMsg) {
        console.log(errorMsg);
    }
});

$('#category_types').on('change', function(event) {
    let currentValue = event.currentTarget.value;
    getNominees(currentValue);
});

function getNominees(currentValue) {
    $.ajax({
        url : 'https://anapaotrev.github.io/lab_web/lab3/data/grammys.json',
        type : 'GET',
        dataType : 'json',
        success : function(data) {
            addNomineesSection(data.fields[currentValue]);
        },
        error : function(errorMsg) {
            console.log(errorMsg);
        }
    });
}

function addNomineesSection(info) {
    $('#nominees_section').html('');
    let categoryInfo = `<h2>${info.field}</h2>`;
    categoryInfo += `<p class="description">${info.description ? info.description : ''}</p>`;
    
    let categories = '';

    for (let i = 0; i < info.categories.length; i++) {
        categories += `<h3>${info.categories[i].category_name}</h3>`;
        categories += "<ul>"

        let nominees = info.categories[i].nominees;

        for (let j = 0; j < nominees.length; j++) {
            categories += `<li>
                <h4 class="${j == info.categories[i].winner_id ? 'winner' : ''} ${nominees[j].artist == 'Taylor Swift' ? 'taylor-swift' : ''}">${nominees[j].nominee}</h4>
                <div class="${nominees[j].artist == 'Taylor Swift' ? 'taylor-swift' : ''}">${nominees[j].artist}</div>
                <div>${nominees[j].info}</div>
            </li>`;
        }
        categories += "</ul>";

        if (i != info.categories.length - 1) {
            categories += "<hr>";
        }
    }

    categoryInfo += categories;

    // adds new html
    $('#nominees_section').append(categoryInfo);
}

getNominees(0);