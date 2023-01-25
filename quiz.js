$(document).ready(function() {
    // Charger les données du quiz à partir du fichier JSON
    $.getJSON("quiz.json", function(data) {
        // Initialiser les variables pour stocker les informations du quiz
        var currentQuestion = 0;
        var score =0;
        var filteredQuestions = data.questions; // Stocker toutes les questions par défaut
            // Afficher la première question
    displayQuestion(filteredQuestions, currentQuestion);

    // Gérer la sélection de catégorie
    $("#category-select").change(function() {
        var selectedCategory = $(this).val();
        if (selectedCategory == "toutes") {
            filteredQuestions = data.questions; // Afficher toutes les questions
        } else {
            filteredQuestions = data.questions.filter(function(question) {
                return question.category == selectedCategory; // Filtrer les questions en fonction de la catégorie sélectionnée
            });
        }
        currentQuestion = 0; // Réinitialiser la question actuelle
        score = 0; // Réinitialiser le score
        displayQuestion(filteredQuestions, currentQuestion);
    });

    // Gérer la soumission du formulaire
    $("form").submit(function(e) {
        e.preventDefault();
        // Vérifier si la réponse est correcte
        var selectedAnswer = $("input[name='answer']:checked").val();
        if (selectedAnswer == filteredQuestions[currentQuestion].correctAnswer) {
            score++;
        }
        // Afficher la question suivante ou afficher le résultat final
        if (currentQuestion < filteredQuestions.length - 1) {
            currentQuestion++;
            displayQuestion(filteredQuestions, currentQuestion);
        } else {
            displayResult(score, filteredQuestions.length);
        }
    });
});
});

// Fonction pour afficher la question actuelle
function displayQuestion(questions, currentQuestion) {
$("#question").text(questions[currentQuestion].question);
$("#answers").empty();
for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
$("#answers").append("<label><input type='radio' name='answer' value='" + i + "'>" + questions[currentQuestion].answers[i] + "</label>");
}
}

// Fonction pour afficher le résultat final
function displayResult(score, totalQuestions) {
$("#quiz-container").empty();
$("#quiz-container").append("<h1>Resultat final</h1>");
$("#quiz-container").append("<p>Vous avez obtenu " + score + " sur " + totalQuestions + "</p>");
if (score < 5) {
            $('#quiz-container').append('<h1>niveau yassine, va bosser</h1>');
        } else if (score < 6) {
            $('#quiz-container').append('<h1>tes grave en avance</h1>');
        } else {
            $('#quiz-container').append('<h1>Dans tous les cas, tu feras du Wordpress</h1>');
        }
        $("#quiz-container").append("<button id='back-btn'>Revenir en arriere</h1></button>");
        $("#back-btn").click(function() {
            location.reload();
        });
}

