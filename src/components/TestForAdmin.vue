<template>
  <div class="test-unit">

    <p>{{this.name}}</p>
    <p> Категория: {{ this.category}}</p>
    <div class="test-unit__buttons">
      <button class="test-unit__buttons-unit" @click="openTest()">ПОДРОБНЕЕ</button>
      <button class="test-unit__buttons-unit" @click="applyTest()">ОДОБРИТЬ</button>
      <button class="test-unit__buttons-unit" @click="declineTest()">ОТКЛОНИТЬ</button>
      <button class="test-unit__buttons-unit-delete" @click="deleteTheTest()">УДАЛИТЬ</button>
    </div>

    <div v-show="showModal">
      <div class="modal__background">

      </div>
      <div  class="modal__text-part">
        <p>{{this.textModal}}</p>
        <div class="modal__buttons">
          <button class="modal__form-button" @click="decide()">
            {{this.statusModal}}
          </button>
          <button class="modal__form-button" @click="closeModal()">
            ОТМЕНА
          </button>
        </div>

      </div>
    </div>
    <div v-show="showTest">
      <div class="modal__background">

      </div>
      <div  class="modal__text-part">
        <QuestionForAdmin v-for="question in this.getQuestions"
                          :key="question.id"
                          :id="question.id"
                          :questionName="question.questionName"
                          :firstAnswer="question.firstAnswer"
                          :secondAnswer="question.secondAnswer"
                          :thirdAnswer="question.thirdAnswer"
                          :fourthAnswer="question.fourthAnswer"
                          :correctAnswer="question.correctAnswer"
        >

        </QuestionForAdmin>
        <button class="modal__form-button" @click="closeTest()">
          ПОНЯТНО
        </button>
      </div>
    </div>
  </div>
</template>

<script>


import QuestionForAdmin from "@/components/QuestionForAdmin";
import {mapActions, mapGetters, mapMutations} from "vuex";
export default {
  components: {QuestionForAdmin},

  props: ["id","testName","categoryName"],
  data(){
    return {
      number: this.id,
      name: this.testName,
      category: this.categoryName,
      showTest: false,
      showModal: false,
      textModal: '',
      statusModal: ''
    }
  },
  computed:{
    ...mapGetters(['getQuestions']),


  },
  methods:{
    ...mapMutations(["addAdminQuestion", 'removeAllQuestionsAdmin', 'deleteTest', 'clearMyTestsList', 'addMyTestToArray']),
    ...mapActions(['fullQuestionsForAdmin', 'approveTheTest', 'declineTheTest', 'destroyTheTest','fullOnlyMyTests' ]),
    closeModal(){
      this.showModal = false
    },
    closeTest(){
      this.showTest = false
    },

    applyTest(){
      this.showModal = true
      this.textModal = 'Допустить тест?'
      this.statusModal = 'ПРИНЯТЬ'
    },
    declineTest(){
      this.showModal = true
      this.textModal = 'Отклонить тест?'
      this.statusModal = 'ОТКЛОНИТЬ'
    },
    deleteTheTest(){
      this.showModal = true
      this.textModal = 'Удалить тест?'
      this.statusModal = 'УДАЛИТЬ'
    },
    decide(){

      if(this.statusModal === 'ПРИНЯТЬ'){

        this.approveTheTest({id: this.id}).then(result =>{
          if(result.data.status === '1'){

            this.deleteTest({id: this.id})
            this.refreshMyTestsList()

          }
        })
      }
      if(this.statusModal === 'ОТКЛОНИТЬ'){

        this.declineTheTest({id: this.id}).then(result =>{
          if(result.data.status === '1'){
            this.deleteTest({id: this.id})
            this.refreshMyTestsList()
          }
        })
      }
      if(this.statusModal === 'УДАЛИТЬ'){

        this.destroyTheTest({id: this.id}).then(result =>{
          if(result.data.status === '1'){
            this.deleteTest({id: this.id})
            this.refreshMyTestsList()
          }
        })
      }
      this.showModal = false
    },
    openTest(){

      this.removeAllQuestionsAdmin()


     this.fullQuestionsForAdmin({id : this.id}).then(results => {

        if(results.data.status === '1'){
          var a = results.data.result
          a.forEach((question) => {

            var cor = 1;
            if(question.corrects[1]){
              cor = 2;
            }
            if(question.corrects[2]){
              cor = 3;
            }
            if(question.corrects[3]){
              cor = 4;
            }

              this.addAdminQuestion({
                name: question.question_text,
                first: question.texts[0],
                second: question.texts[1],
                third: question.texts[2],
                fourth: question.texts[3],
                correct: cor
              })


          })

        }

      })
      this.showTest = true
    },
    refreshMyTestsList(){
      this.clearMyTestsList();
      this.fullOnlyMyTests({}).then(response => {
        if(response.data.status === '1'){
          var allTests = response.data.result
          allTests.forEach(test =>{
            console.log(test)
            this.addMyTestToArray({
              name: test.test_name,
              status: test.test_status_name
            })
          })
        }
        if(this.getMyTests.length === 0){
          this.isMyTestEmpty = true;
        }
      })

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.test-unit{
  background-color: white;
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  padding: 10px;
  margin-left: 5%;
  margin-right: 5%;
  border: 1px solid darkblue;
}

.test-unit__buttons{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.test-unit__buttons-unit{
  background-color: darkblue;
  border: 3px solid darkblue;
}

.test-unit__buttons-unit, .test-unit__buttons-unit-delete{
  height: 60px;
  margin: 20px;
  border-radius: 30px;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  color: white;
}

.test-unit__buttons-unit-delete{
  background-color: darkred;
  border: 3px solid darkred;
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
  background-color: #f1f5fe;
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

.modal__buttons{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media(max-width: 1500px) {
  .test-unit__buttons{
    grid-template-columns: 1fr 1fr;
  }

}
@media(max-width: 1300px) {
  .test-unit{
    font-size: 24px;
  }
  .modal__buttons{
    grid-template-columns: 1fr;
  }

}
@media(max-width: 800px) {
  .test-unit{
    font-size: 16px;
  }

  .test-unit__buttons{
    grid-template-columns: 1fr;
  }

  .test-unit__buttons-unit, .test-unit__buttons-unit-delete{
    font-size: 24px;
    height: 50px;
  }

}

@media(max-width: 700px) {
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