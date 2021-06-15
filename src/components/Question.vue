<template>
  <div class="text-zone">
    <div class="adder">
      <div class="adder__element">
        <p class="adder__text-question">Введите вопрос (№{{number+1}})</p>
        <textarea class="adder__text-area" v-model="name" maxlength="255"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" v-model="correct" value="1">
          <p class="adder__text">Первый вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255" v-model="first"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" v-model="correct" value="2">
          <p class="adder__text">Второй вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255" v-model="second"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" v-model="correct" value="3">
          <p class="adder__text">Третий вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255" v-model="third"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" v-model="correct" value="4">
          <p class="adder__text">Четвертый вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255" v-model="fourth"></textarea>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {

  props: ["id","questionName","firstAnswer", "secondAnswer", "thirdAnswer", "fourthAnswer", "correctAnswer"],
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
  },
  methods:{
    ...mapMutations(["rewriteQuestion"]),

    send(){
      this.rewriteQuestion({
        id: this.number,
        questionName: this.name,
        firstAnswer: this.first,
        secondAnswer: this.second,
        thirdAnswer: this.third,
        fourthAnswer: this.fourth,
        correctAnswer: this.correct

      })
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.text-zone{
  background-color: #f1f5fe;
  padding: 5px;
  border: 1px solid black;
 margin-top: 50px;
  margin-left: -20px;

}
.adder{
  margin-top: 20px;
  font-family: 'Jura', sans-serif;
  width: 100%;
}
.adder__element{
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 10px 0 0 auto;
}

.adder__small-block{
  display: flex;
  align-items: center;
}
.adder__text{
  vertical-align: middle;
  text-align: center;
  display: block;
  font-size: 24px;
  margin-right: 10px;
}
.adder__text-question{
  vertical-align: middle;
  text-align: left;
  display: block;
  font-size: 24px;
  margin-right: 10px;
}
.adder__text-area{
  font-size: 20px;
  font-family: 'Jura', sans-serif;
  resize: none;
  height: 95px;
  width: 98%;

}

@media(max-width: 1200px){
  .adder__text-area {
    font-size: 16px;
  }

}
@media(max-width: 900px){
  .adder__element {
    display: block;
    text-align: center;
  }
  .adder__text-area{
    width: 95%;
  }

}


@media(max-width: 600px) {
  .adder__text-area{
    height: 130px;
  }
}
@media(max-width: 500px) {
  .adder__text-area{
    height: 160px;
  }
}
</style>