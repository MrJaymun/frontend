<template>
  <div class="page">
    <div class="page__header">
      <div class="header__nav">
        <button class="header__button" @click="$router.push('/main')">Главная страница</button>
        <button class="header__button" @click="$router.push('/rating')">Рейтинг</button>
        <button class="header__button" v-if="isNotUsual" @click="$router.push('/add-test')">Создать тест</button>
      </div>
    </div>
    <div class="block-header">
      <p>ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ</p>
    </div>

    <div class="user-info">

      <div class="user-info__stat">
        <div class="user-info__stat-element">
          <p>Логин</p>
          <input class="user-info__input" disabled v-model="login">
        </div>
        <div class="user-info__stat-element">
          <p>Создано тестов</p>
          <input class="user-info__input" disabled v-model="createdTests">
        </div>
        <div class="user-info__stat-element">
          <p>Статус аккаунта</p>
          <input class="user-info__input" disabled v-model="role">
        </div>
      </div>
      <div class="user-info__stat">
        <div class="user-info__stat-element">
          <p>Успешных попыток</p>
          <input class="user-info__input" disabled v-model="passedTests">
        </div>
        <div class="user-info__stat-element">
          <p>Отмененнных попыток</p>
          <input class="user-info__input" disabled v-model="failedTests">
        </div>
        <div class="user-info__stat-element">
          <p>Среднее время на попытку</p>
          <input class="user-info__input" disabled v-model="mediumTime">
        </div>

      </div>

    </div>

    <div class="block-header" v-if="isAdmin">
      <p>ТЕСТЫ НА РАССМОТРЕНИИ</p>
    </div>
    <div class="test-decider" v-if="isAdmin">


      <TestForAdmin v-for="test in this.getTests"
                    :key="test.id"
                    :id="test.id"
                    :test-name="test.testName"
                    :categoryName="test.category"
      >
      </TestForAdmin>

      <p class="test-decider__empty" v-if="isEmpty">Тестов на расммотрении нет</p>
    </div>
    <div class="block-header" v-if="isNotUsual">
      <p>МОИ ТЕСТЫ</p>
    </div>
    <div class="test-decider" v-if="isNotUsual">
      <MyTest v-for="test in this.getMyTests"
              :key="test.id"
              :id="test.id"
              :testName="test.testName"
              :statusName="test.status"
      >
      </MyTest>
      <p class="test-decider__empty" v-if="isMyTestEmpty">Тестов на расммотрении нет</p>

    </div>

    <div class="block-header" >
      <p>ИЗМЕНЕНИЕ ПАРОЛЯ</p>
    </div>

    <div class = "change-password">
      <div >
        <p class="change-password__text">Введите старый пароль</p>
        <input  class="change-password__input" v-model="password"  placeholder="Английские буквы и цифры" type="password" maxlength="20">
      </div>
      <div>
        <p class="change-password__text">Введите новый пароль</p>
        <input class="change-password__input" v-model="passwordNew"  placeholder="Английские буквы и цифры" type="password" maxlength="20">
      </div>
      <div>
        <p class="change-password__text">Повторите новый пароль</p>
        <input class="change-password__input" v-model="passwordAnother"  placeholder="Английские буквы и цифры" type="password" maxlength="20">
      </div>
      <button @click="tryToChangePassword" class="change-password__button">
        ИЗМЕНИТЬ ПАРОЛЬ
      </button>

    </div>
    <div v-show="showModal">
      <div class="modal__background">

      </div>
      <div  class="modal__text-part">
        <p>{{this.textModal}}</p>
        <button class="modal__form-button" @click="closeModal()">
          ПОНЯТНО
        </button>
      </div>
    </div>
    <div class="exit">
      <button v-if="isAdmin" class="exit__button" @click="$router.push('/dashboard')"> К АНАЛИТИКЕ</button>
      <button class="exit__button" @click="$router.push('/')"> ВЫЙТИ</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import TestForAdmin from "@/components/TestForAdmin";
import MyTest from "@/components/MyTest";

export default {
  components: {MyTest, TestForAdmin},
  data() {
    return {
      isNotUsual: false,
      isAdmin: false,
      login: '',
      role: 'Базовый',
      failedTests: 0,
      mediumTime: '',
      createdTests: 0,
      passedTests: 0,
      password: '',
      passwordNew: '',
      passwordAnother: '',
      showModal: false,
      textModal: "",
      isEmpty: false,
      isMyTestEmpty: false
    }
  },
  computed:{
    ...mapGetters(['getQuestions', 'getTests', 'getMyTests']),
  },
  methods:{
    ...mapActions(['firstLevel', 'secondLevel', 'takeInfoAboutLogin', 'takeInfoAboutCreatedTests', 'takeInfoAboutPassedTests', 'changePasswordToNew', 'testList', 'fullOnlyMyTests', 'getTime']),
    ...mapMutations(['clearQuestionList', 'clearTestsList', 'addTestToArray', 'clearMyTestsList', 'addMyTestToArray']),
    closeModal(){
      this.showModal = false;
    },
    tryToChangePassword(){
        if(this.password === ''){
          this.showModal = true
          this.textModal = 'Введите пароль'
        }
        else{
          if(this.passwordNew === ''){
            this.showModal = true
            this.textModal = 'Новый пароль не может быть пустым'
          }
          else{
            const regexUsual = /^[A-Za-z0-9\s]+$/;
            if(!regexUsual.exec(this.passwordNew)){
              this.showModal = true
              this.textModal = 'Недопустимые символы в новом пароле'
            }
            else{
              if (this.passwordNew.length < 6) {
                this.showModal = true
                this.textModal = 'Новый пароль слишком короткий'
              } else {
                if (this.passwordNew != this.passwordAnother) {
                  this.showModal = true
                  this.textModal = 'Новые пароли не совпадают'
                } else {
                  if (this.passwordNew === this.password) {
                    this.showModal = true
                    this.textModal = 'Новые пароль совпадает со старым'
                  } else {
                    this.changePasswordToNew({
                      login: this.login,
                      old: this.password,
                      new: this.passwordNew
                    }).then(response => {
                      if (response.data.status === '1') {
                        this.showModal = true
                        this.textModal = 'Пароль изменен'
                      } else {
                        this.showModal = true
                        this.textModal = 'Введен неправильный пароль'
                      }
                    })
                  }
                }
              }
            }
          }
        }
    },

    refreshListOfUnresolvedTests(){
      this.clearQuestionList()
      this.clearTestsList()
      this.isEmpty = false;
      this.testList({}).then(response =>{
        if(response.data.status === '1'){
          var allTests = response.data.result
          allTests.forEach(test =>{

            this.addTestToArray({
              id: test.test_id,
              name: test.test_name,
              category: test.test_category_name
            })
          })
        }

      })


    },

    refreshMyTestsList(){
      this.clearMyTestsList();
      this.fullOnlyMyTests({}).then(response => {
        if(response.data.status === '1'){
          var allTests = response.data.result
          allTests.forEach(test =>{

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

  },
  beforeMount() {


    if (!localStorage.getItem('token')) {
      this.$router.push('/');
    }
    else{
      this.firstLevel({}).then(response =>{

        if(response.data.result){
          this.isNotUsual = true;
          this.role = 'Создатель тестов'
        }
        else{
          this.isNotUsual =  false
        }
      })
      this.secondLevel({}).then(response =>{

        if(response.data.result){
          this.isAdmin = true;
          this.role = 'Администратор'
        }
        else{
          this.isAdmin =  false
        }
      })
      this.takeInfoAboutLogin({}).then(response =>{
        this.login = response.data.result
        this.takeInfoAboutCreatedTests({
          login: this.login
        }).then(responseCr =>{
          if(responseCr.data.status === '1'){
            this.createdTests = responseCr.data.result

          }
        })
        this.takeInfoAboutPassedTests({
          login: this.login
        }).then(responseCr =>{

          if(responseCr.data.status === '1'){
            this.passedTests = responseCr.data.counter[1].counter
            this.failedTests = responseCr.data.counter[0].counter
          }
        })
        this.getTime({ login: this.login}).then((responseCr=>{

          if(responseCr.data.status === '1'){
            this.mediumTime = responseCr.data.time[0].time
          }

        }))
      })

      this.refreshListOfUnresolvedTests();
      this.refreshMyTestsList();

    }


  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.page__header{
  background-color: white;
}
.header__nav{
  display: flex;
  margin: 10px 5%;
  flex-direction: row;
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

.block-header{
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  margin-top: 50px;
}

.user-info{
  display: grid;
  grid-auto-flow: column;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 24px;
  font-family: 'Jura', sans-serif;
}

.user-info__stat{
  border: 1px solid black;
  margin-left: 2%;
  margin-right: 2%;
}

 .user-info__stat-element{
  display: grid;
  grid-auto-flow: column;
  text-align: center;
  padding: 50px;
  grid-template-columns: 40% 60%;

}
.user-info__input{
  font-size: 24px;
  text-align: center;
  font-family: 'Jura', sans-serif;
  width: 100%;

}

.change-password__input{
  font-size: 24px;
  text-align: center;
  font-family: 'Jura', sans-serif;
  width: 500px;
  height: 50px;
  margin-bottom: 30px;

}


 .modal__form-button, .exit__button, .change-password__button{
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

 .modal__form-button:hover, .exit__button:hover, .change-password__button:hover{
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
  padding: 20px;
  margin: -500px auto 0;
  border: 5px solid darkblue;
  text-align: center;
  width: 550px;
  font-family: 'Jura', sans-serif;
  font-size: 30px;
}

.test-decider{
  background-color: #f1f5fe;
  border: 1px solid black;
  margin-left: calc(5% + 25px);
  margin-right: calc(5% + 25px);
  padding-bottom: 50px;
  margin-bottom: 50px;
}

.test-decider__empty{
  text-align: center;
  font-family: 'Jura', sans-serif;
  font-size: 30px;
}

.change-password{
  border: 1px solid black;
  margin-left: calc(5% + 25px);
  margin-right: calc(5% + 25px);
  padding-bottom: 50px;
  margin-bottom: 50px;
  text-align: center;
}

.change-password__text{
  font-size: 30px;
  font-family: 'Jura', sans-serif;
}
.exit{
  text-align: center;
  margin: 100px auto 0;
}

@media(max-width: 1500px) {
  .user-info{
    grid-auto-flow: row;
  }

}
@media(max-width: 800px) {
  .user-info__stat-element{
    padding: 20px;
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
  .modal__form-button, .exit__button, .change-password__button{
    font-size: 24px;
    width: 250px;
    height: 50px;
  }
  .modal__text-part{
    max-width: 260px;

  }

  .change-password__input{
    width: 300px;
    font-size: 20px;
  }
}
@media(max-width: 500px) {
  .user-info__stat-element p, .user-info__input{
    font-size: 14px;
  }
  .change-password__button{
    width: 200px;
    font-size: 20px;
  }
  .change-password__input{
    width: 200px;
    font-size: 10px;
  }
}
@media(max-width: 400px) {
  .user-info__stat-element{
   padding: 20px;
  }
}
</style>