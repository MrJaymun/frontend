<template>
  <div class="auth">

    <form class="auth__form" @submit.prevent="tryToRegister()">
      <p class="auth__form-title">Добро пожаловать!</p>
      <p class="auth__form-text">Введите логин</p>
      <input placeholder="Английские буквы и цифры" v-model="login" maxlength="20" class="auth__form-input" >
      <p class="auth__form-text">Введите пароль</p>
      <input  placeholder="Английские буквы и цифры" v-model="password" maxlength="20" class="auth__form-input" type="password">
      <p class="auth__form-text">Повторите пароль</p>
      <input  placeholder="Английские буквы и цифры"  v-model="passwordCopy" maxlength="20" class="auth__form-input" type="password">
      <p class="auth__form-text">Введите вашу электронную почту</p>
      <input  placeholder="Электронная почта" v-model="email" maxlength="31" class="auth__form-input">
      <div class="register__buttons-block">
        <button class="auth__form-button" type="submit">
          СОЗДАТЬ АККАУНТ
        </button>
        <button class="auth__form-button" @click="$router.push('/')">
          К АВТОРИЗАЦИИ
        </button>
      </div>


    </form>
    <div v-show="showModal">
      <div class="auth__modal-background">

      </div>
      <div  class="auth__modal-text-part">
        <p>{{this.textModal}}</p>
        <button class="auth__form-button" @click="closeModal()">
          ПОНЯТНО
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {

  data(){
    return{
      login: "",
      password: "",
      passwordCopy: "",
      email: "",
      showModal: false,
      textModal: ""
    }
  },
  methods:{
    ...mapActions(['sendInfoAboutNewUser', 'registerCheck', 'registerNewUser']),

    closeModal(){
      this.showModal = false;
    },

    tryToRegister(){
      const regexUsual = /^[A-Za-z0-9\s]+$/;
      const regexEmail = /^[A-Za-z0-9@.\s]+$/;
      const matchLogin = regexUsual.exec(this.login);
      if(!matchLogin){
        this.showModal = true;
        this.textModal = 'Недопустимые символы в логине';
      }
      else if(this.login.length < 6){
        this.showModal = true;
        this.textModal = 'Слишком короткий логин';
      }
      else{
        const matchPassword = regexUsual.exec(this.password);
        if(!matchPassword){
          this.showModal = true;
          this.textModal = 'Недопустимые символы в пароле';
        }
        else if(this.password.length < 6){
          this.showModal = true;
          this.textModal = 'Слишком короткий пароль';
        }
        else{
          if(this.password !== this.passwordCopy){
            this.showModal = true;
            this.textModal = 'Пароли не совпадают';
          }
          else{
            const matchEmail = regexEmail.exec(this.email);
            if(!matchEmail){
              this.showModal = true;
              this.textModal = 'Недопустимые символы в email';
            }
            else if(this.email.length < 6){
              this.showModal = true;
              this.textModal = 'Слишком короткий Email';
            }
            else{

              this.registerCheck({
                login: this.login,
                email: this.email
              }).then(response =>{
                if(response.data.status === '2'){
                  this.showModal = true;
                  this.textModal = 'Пользователь с данным логином или почтой уже зарегистрирован';
                }
                else{

                  this.registerNewUser({
                    login: this.login,
                    password: this.password,
                    email: this.email,
                    user_category_id: '1'
                  }).then(response =>{
                    if(response.data.status === '1'){
                      this.showModal = true;
                      this.textModal = 'Пользователь успешно добавлен';
                    }
                  }).catch((error)=> {
                    if(error.status === 503){
                      this.textModal = 'Нет соединения с БД';
                    }
                  })
                }
              }).catch((error)=> {
                this.showModal = true;
                if(error.status === 503){
                  this.textModal = 'Нет соединения с БД';
                }
              })
            }
          }
        }

      }
    }



  },
  beforeMount() {
    localStorage.removeItem('token')
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');
.auth{
  border: 1px solid black;
  width: 600px;
  display: block;
  margin: 5% auto 0;
  font-size: 40px;
  background-color: #f1f5fe;
  font-family: 'Jura', sans-serif;
}

.auth__form{
  margin:0 auto;

}

.auth__form-title{
  text-align: center;
  font-size: 50px;

}
.auth__form-text{
  text-align: center;
  margin-bottom: 0;
  width: 600px;



}

.auth__form-input{
  margin-left: 15%;
  width: 400px;
  font-size:30px;
  height: 50px;
  border-radius: 20px;
  text-align: center;
  font-family: 'Jura', sans-serif;

}
.auth__form-input::placeholder{
  padding: 0 10px;
  font-size: 24px;
}

.register__buttons-block{
  margin-top: 20px;
}
.auth__form-button{
  display: block;
  margin: 0 auto 20px;
  background-color: darkblue;
  color: white;
  border-radius: 20px;
  font-size: 30px;
  width: 400px;
  height: 60px;
  border: 3px solid darkblue;
  font-family: 'Jura', sans-serif;


}

.auth__form-button:hover{
  background-color: black;
  color: white;
  border: 3px solid black;
}

.auth__modal-background{
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

.auth__modal-text-part{
  position: absolute;
  background-color: white;
  margin-top: -500px;
  padding: 20px;
  border: 5px solid darkblue;
  text-align: center;
  width: 550px;
}

@media (max-width: 700px) {
  .auth{
    width: 300px;
    font-size: 26px;
  }
  .auth__form-title{
    font-size: 34px;
  }

  .auth__form-input{

    margin: 0 auto 0 3px;
    font-size: 22px;
    width: 285px;
    height: 30px;
    text-align: center;
  }

  .auth__form-input::placeholder{

    font-size: 20px;
  }

  .auth__form-text{
    width: 300px;
  }
  .auth__form-button{
    font-size: 24px;
    width: 250px;
    height: 50px;
  }
  .auth__modal-text-part{
    max-width: 260px;

  }

}
</style>