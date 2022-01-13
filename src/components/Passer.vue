<template>
  <div class="passer">

    <p> « {{this.test}} »</p>
    <p> Категория: {{this.category_name}}</p>
    <p> Всего вопросов: {{this.the_counter}}</p>
    <button class="passer__button" @click="beginTest">
      ПРОЙТИ ТЕСТ
    </button>
    <div v-show="showTest">
      <div class="modal__background">

      </div>
      <div  class="modal__text-part">
        <UnitOfPasser v-for="question in this.getCurrentQuestions"
                          :key="question.id"
                          :id="question.id"
                          :questionName="question.questionName"
                          :firstAnswer="question.firstAnswer"
                          :secondAnswer="question.secondAnswer"
                          :thirdAnswer="question.thirdAnswer"
                          :fourthAnswer="question.fourthAnswer"
                          :firstAnswerId="question.firstAnswerId"
                          :secondAnswerId="question.secondAnswerId"
                          :thirdAnswerId="question.thirdAnswerId"
                          :fourthAnswerId="question.fourthAnswerId"
                          :chosenAnswer="question.chosenAnswer"
        >
        </UnitOfPasser>
        <button class="modal__form-button" v-if="(this.the_counter - this.remaining) === 0" @click="send()">
          ГОТОВО
        </button>
        <p  v-if="(this.the_counter - this.remaining) > 0"> Не дано ответов: {{(this.the_counter - this.remaining)}}</p>
        <button class="modal__form-button" @click="closeTest()">
          ЗАКРЫТЬ
        </button>
      </div>
    </div>
    <div v-show="showResult">
      <div class="modal__background">

      </div>
      <div  class="modal__text-part">

        <p>Ваш результат: {{this.result}} из {{this.counter}}</p>
        <button class="modal__form-button" @click="closeResult()">
          ЗАКРЫТЬ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import UnitOfPasser from "@/components/UnitOfPasser";

export default {
  components: {UnitOfPasser},
  props: ["test_id", "cat_id", "cat_name", "test_name", "counter"],
  data() {
    return {
      id: this.test_id,
      category_id: this.cat_id,
      category_name: this.cat_name,
      test: this.test_name,
      the_counter: this.counter,
      showTest: false,
      showResult: false,
      result: 0

    }
  },
  computed:{
    ...mapGetters(['getCurrentQuestions']),
    remaining:{
      get(){return this.getCurrentQuestions.filter(x => x.chosenAnswer !== 0).length},

    }


  },
  methods: {
    ...mapActions(['fullAllPassingQuestions', 'sendResultsToServer', 'beginTheTest', 'failTheTest']),
    ...mapMutations(['removeAllQuestionsToPass', 'addQuestionToPass']),
    beginTest(){
      this.removeAllQuestionsToPass();
      this.fullAllPassingQuestions({id: this.id}).then(results =>{
        if(results.data.status === '1'){
          var unit = results.data.result
          unit.forEach((question) => {
           this.addQuestionToPass({
             name: question.question_text,
             first: question.texts[0],
             second: question.texts[1],
             third: question.texts[2],
             fourth: question.texts[3],
             firstId: question.ids[0],
             secondId: question.ids[1],
             thirdId: question.ids[2],
             fourthId: question.ids[3],
           })
          })
          this.beginTheTest({id: this.id});
          this.showTest = true;
        }
      })

    },
    closeTest(){
      this.showTest = false;
      this.failTheTest({id: this.id});
    },

    closeResult(){

      this.showResult = false;

    },
    send(){
      let items = []
      this.getCurrentQuestions.forEach(x => {

        if(x.chosenAnswer === 1){
          items.push(x.firstAnswerId)
        }
        if(x.chosenAnswer === 2){
          items.push(x.secondAnswerId)
        }
        if(x.chosenAnswer === 3){
          items.push(x.thirdAnswerId)
        }
        if(x.chosenAnswer === 4){
          items.push(x.fourthAnswerId)
        }

      })
      this.sendResultsToServer({items, id: this.id}).then(response => {
        this.closeTest()
        if(response.data.status === '1'){
          this.showResult = true
          this.result = response.data.result[0].counter
        }

      })

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.passer{
  background-color: white;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  border: 1px solid black;
  margin: 60px 5%;
  text-align: center;
  padding: 15px;

}

.passer__button{
  display: block;
  margin: 0 auto 30px;
  background-color: darkblue;
  color: white;
  border-radius: 30px;
  font-size: 30px;
  width: 400px;
  height: 60px;
  border: 3px solid darkblue;
  font-family: 'Jura', sans-serif;

}

.passer__button:hover, .modal__form-button:hover{
  background-color: black;
  border: 3px solid black;
}
.modal__background{
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;

}

.modal__text-part{
  position: relative;
  background-color: white;
  border: 5px solid darkblue;
  text-align: center;
  width: inherit;
  font-family: 'Jura', sans-serif;
  font-size: 30px;
  margin:  auto 0;
}
.modal__form-button{
  display: block;
  margin: 0 auto 30px;
  background-color: darkblue;
  color: white;
  border-radius: 30px;
  font-size: 30px;
  width: 400px;
  height: 60px;
  border: 3px solid darkblue;
  font-family: 'Jura', sans-serif;

}

@media(max-width: 1100px) {
  .passer{
    font-size: 24px;
  }
}
@media(max-width: 700px) {

  .passer__button{
    font-size: 24px;
    width: 200px;
    height: 50px;
  }
  .modal__form-button{
    font-size: 24px;
    width: 250px;
    height: 50px;
  }
}

@media(max-width: 500px) {
  .modal__form-button{
    width: 150px;
  }
}
</style>