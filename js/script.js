$(document).ready(function () {
   
    const words = [
        { word: 'Hello', translation: 'Привіт' },
        {word: 'Sun', translation: 'Сонце'},
        {word: 'Book', translation: 'Книга'},
        {word: 'Air', translation: "Повітря"},
        {word: 'Water', translation: 'Вода'},
        {word: 'Tree', translation: 'Дерево'},
        {word: 'Friend', translation: 'Друг'},
        {word: 'Table', translation: 'Стіл'},
        {word: 'Home', translation: 'Дім'},
        {word: 'Orange', translation: 'Апельсин'}
       
    ];
    $("#left").text(words.length);
   
   

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let randWords = shuffleArray(words);
    
    //першу картку 
    displayFlashcard();

    console.log(randWords);
    // Кнопка і Enter
    $('#checkAnswersBtn').on('click', function (){inputHandler()});
    $(document).on('keydown','.translation-input', function (e) {
        if (e.which === 13) 
        { 
            
            inputHandler();
        }
    });
    function inputHandler(){
        const userTranslation = $('.translation-input').val().trim().toLowerCase();
        const correctTranslation = randWords[currentStep].translation.toLowerCase();

        console.log(correctTranslation+ " = "+ userTranslation);
        if (userTranslation === correctTranslation) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        $("#incorrectCount").text(incorrectCount);
        $("#correctCount").text(correctCount);
        $("#current").text(currentStep+1);
        
        
        currentStep++;
        
        if (currentStep < randWords.length) {
            // наступну картку
            
            displayFlashcard();
            $('.translation-input').focus();
        } else {
           
            showModal();
        }
}
    

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function displayFlashcard() {
       
        const card = `
            <div class="col-md-12">
                <div class="card text-center bg-dark text-light">
                    <div class="card-body">
                        <h5 class="card-title">${randWords[currentStep].word}</h5>
                        <input type="text" class="form-control translation-input" placeholder="Введіть переклад">
                    </div>
                </div>
            </div>
        `;

        $('#flashcards').html(card);
    }

    //modal
    function showModal() {
  
        const levelResult = `
            Ваш рівень знань мови:<br>
            Правильно: ${correctCount}<br>
            Неправильно: ${incorrectCount}<br>
            Успішність ${Math.round((correctCount / words.length)*100, 2)+'%'}
        `;
        $('#levelResult').html(levelResult);
        $('#levelModal').modal('show');
    }

     $('#levelModal').on('hidden.bs.modal', function () {
        location.reload(true); 
    });

     
});
