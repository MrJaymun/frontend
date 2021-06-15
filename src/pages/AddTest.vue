<template>
  <div class="page">
    <div class="page__header">
      <div class="header__nav">
        <button class="header__button" @click="$router.push('/personal')">Личный кабинет</button>
        <button class="header__button">Рейтинг</button>
        <button class="header__button" @click="$router.push('/main')">Главная страница</button>
      </div>
    </div>
    <div class="text-zone">
      <div class="adder">
        <div class="adder__element">
          <p class="adder__text">Введите название теста</p>
          <textarea class="adder__text-area" v-model="testName" maxlength="255"></textarea>
        </div>
        <div class="adder__element">
          <p class="adder__text">Выберите категорию</p>
          <select class="adder__select" size="1" v-model="theme">
            <option value="1">Спорт</option>
            <option value="2">Кино</option>
            <option value="3">Музыка</option>
            <option value="4">Технологии</option>
            <option value="5">Мультфильмы</option>
            <option value="6">Игры</option>
            <option value="7">Природа</option>
            <option value="8">Известные люди</option>
            <option value="9">Искусство</option>
            <option value="10">География</option>
            <option value="11">История</option>
            <option value="12">Другое</option>
          </select>
        </div>

        <Question ref="all" v-for="question in this.getQuestions"
                  :key="question.id"
                  :id="question.id"
                  :questionName="question.questionName"
                  :firstAnswer="question.firstAnswer"
                  :secondAnswer="question.secondAnswer"
                  :thirdAnswer="question.thirdAnswer"
                  :fourthAnswer="question.fourthAnswer"
                  :correctAnswer="question.correctAnswer"
        >

        </Question>
      </div>
      <div class="footer">
        <button class="footer__form-button"  @click="addNewQuestion">
          ДОБАВИТЬ ВОПРОС
        </button>
        <button class="footer__form-button"  @click="removeLastQuestion">
          УДАЛИТЬ ВОПРОС
        </button>
        <button class="footer__form-button"  @click="saveTest">
          СОХРАНИТЬ ТЕСТ
        </button>
        <div v-show="showModal">
          <div class="footer__modal-background">

          </div>
          <div  class="footer__modal-text-part">
            <p>{{this.textModal}}</p>
            <button class="footer__form-button" @click="closeModal()">
              ПОНЯТНО
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Question from "@/components/Question";


export default {
  components: {Question},
  data(){
    return{
      theme: 1,
      testName: this.getName,
      showModal: false,
      textModal: ""
    }
  },
  computed:{
    ...mapGetters(['getQuestions', 'getName']),


  },
  methods:{
    ...mapActions(['firstLevel', 'testNameChecker', 'addTest', 'addQuestionToDataBase']),
    ...mapMutations(["addQuestion", "removeQuestion", 'addName', 'removeAllQuestions']),
    addNewQuestion(){
      if(this.getQuestions.length < 20){
        this.addQuestion()
      }
      else{
        this.showModal = true;
        this.textModal = 'В тесте не может быть больше 20 вопросов'
      }

    },

    removeLastQuestion(){
      if(this.getQuestions.length > 1)
      this.removeQuestion()
    },

    saveTest(){
      const full = this.$refs.all;
      this.addName({
        name: this.testName
      })
      full.forEach((unit)=> unit.send())
      if(this.getName != ''){
        const all = this.getQuestions;
        let checker = true;
        all.forEach((unit)=> {

          if(unit.questionName === ''){
            checker = false;
          }
          if(unit.firstAnswer === ''){
            checker = false;
          }
          if(unit.secondAnswer === ''){
            checker = false;
          }
          if(unit.thirdAnswer === ''){
            checker = false;
          }
          if(unit.fourthAnswer === ''){
            checker = false;
          }
        })
        if(!checker){
          this.showModal = true;
          this.textModal = 'Поля вопросов и ответов не должны быть пустыми'
        }
        else{

          this.testNameChecker({
            name: this.getName
          }).then(response =>{
            if(response.data.status === '1'){
              this.addTest({
                category: this.theme,
                test_name: this.getName
              }).then(response =>{
                if(response.data.status === '1'){


                  this.getQuestions.forEach(  async (que)=>{

                      await this.addQuestionToDataBase({
                      test_name: this.getName,
                      quest: que.questionName,
                      questId: que.id+1,
                      correct: que.correctAnswer,
                      first: que.firstAnswer,
                      second: que.secondAnswer,
                      third: que.thirdAnswer,
                      fourth: que.fourthAnswer,
                    })
                  })
                  this.showModal = true;
                  this.textModal = 'Тест успешно добавлен'

                }
                else{
                  this.showModal = true;
                  this.textModal = 'Ошибка при подключении к базе данных'
                }
              })
            }
            else  if(response.data.status === '2'){
              this.showModal = true;
              this.textModal = 'Имя теста уже занято'
            }
            else{
              this.showModal = true;
              this.textModal = 'Ошибка соединения с базой данных'
            }

        })
      }
      }
      else{
        this.showModal = true;
        this.textModal = 'Имя теста не должно быть пустым'
      }


    },

    closeModal(){
      this.showModal = false;
    }
  },
  beforeMount() {
      if(!localStorage.getItem('token')){
        this.$router.push('/');
      }
    this.firstLevel({}).then(response =>{

      if(!response.data.result){
        this.$router.push('/main');
      }
    })
    this.removeAllQuestions();
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.page{
  background-color: white;
}
.page__header{
  background-color: white;
}
.header__nav{
  display: flex;
  margin: 10px 5%;
  flex-direction: row-reverse;
  border-bottom: 1px solid gray;
}
.header__button{
  width: 25%;
  height: 80px;
  margin: 3%;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  border: 0;
  background-color: white;
}
.header__button:hover{
  text-decoration: underline;

}
.adder{
  font-family: 'Jura', sans-serif;
  width: 90%;
  padding-top: 30px;
  margin: 0 auto;
}
.adder__element{
  display: grid;
  align-items: center;
  grid-template-columns: 30% 70%;
}
.adder__select{
  font-family: 'Jura', sans-serif;
  font-size: 30px;
  margin-right: 0;
}
.adder__text{
  vertical-align: middle;
  text-align: center;
  display: block;
  font-size: 24px;
  margin-right: 10px;
}
.adder__text-area{
  font-size: 20px;
  font-family: 'Jura', sans-serif;
  resize: none;
  height: 95px;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}
.footer__form-button{
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

.footer{
  font-family: 'Jura', sans-serif;

  margin: 50px auto 0;
  padding-bottom: 200px;
}

.footer__modal-background{
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

.footer__modal-text-part{
  position: absolute;
  background-color: white;
  padding: 20px;
  border: 5px solid darkblue;
  text-align: center;
  margin-left: calc(50% - 300px);
  margin-top: -500px;
  width: 550px;
  font-size: 30px;
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
    width: 100%;
  }

}
@media(max-width: 700px) {
  .header__nav{
    flex-direction: column-reverse;
  }
  .header__button{
    width: 90%;
    font-size: 24px;
  }

  .footer__form-button{
    font-size: 24px;
    width: 250px;
    height: 50px;
  }
  .footer__modal-text-part{
    max-width: 260px;
    margin-left: calc(50% - 160px);

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
