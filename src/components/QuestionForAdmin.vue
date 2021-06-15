<template>
  <div class="question">
    <p>
      {{this.name}}
    </p>
    <div class="question__buttons">
      <button class="question__buttons-element" :class="[(this.correct === 1) ? 'correct' : 'uncorrect']">
        {{this.first}}
      </button>
      <button class="question__buttons-element" :class="[(this.correct === 2) ? 'correct' : 'uncorrect']">
        {{this.second}}
      </button>
      <button class="question__buttons-element" :class="[(this.correct === 3) ? 'correct' : 'uncorrect']">
        {{this.third}}
      </button>
      <button class="question__buttons-element" :class="[(this.correct === 4) ? 'correct' : 'uncorrect']">
        {{this.fourth}}
      </button>
    </div>


  </div>
</template>

<script>

export default {
  props: ["id", "questionName","firstAnswer", "secondAnswer", "thirdAnswer", "fourthAnswer", "correctAnswer"],
  data(){
    return {
      number: this.id,
      name: this.questionName,
      first: this.firstAnswer,
      second: this.secondAnswer,
      third: this.thirdAnswer,
      fourth: this.fourthAnswer,
      correct: this.correctAnswer
    }
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.question{
  border: 3px solid darkblue;
  margin: 20px;
  background-color: white;
  padding: 10px;

}

.question__buttons{
  display: grid;
  grid-template-columns: 1fr;
}
.question__buttons-element{
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 30px;
  border: 3px solid black;
}
.correct{
  background-color: darkgreen;
}
.uncorrect{
  background-color: darkred;
}

@media(max-width: 800px) {
  .question__buttons-element, .question{
    font-size: 24px;
  }

}
@media(max-width: 500px) {
  .question__buttons-element, .question{
    font-size: 16px;
    padding: 3px;

  }

}
</style>