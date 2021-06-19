<template>
    <div class="auth">

      <form class="auth__form" @submit.prevent="tryToLogin()">
        <p class="auth__form-title">С возвращением!</p>
        <p class="auth__form-text">Логин<input v-model="login" placeholder="Английские буквы и цифры" maxlength="20" class="auth__form-input"></p>
        <p class="auth__form-text">Пароль<input v-model="password" placeholder="Английские буквы и цифры" type="password" maxlength="20" class="auth__form-input"></p>
       <button class="auth__form-button" type="submit">
          ВОЙТИ
        </button>
        <button class="auth__form-button" @click="$router.push('/register')">
          РЕГИСТРАЦИЯ
        </button>
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
      showModal: false,
      textModal: ""
    }
  },

  methods:{
    ...mapActions(['loginCheck']),

    closeModal(){
      this.showModal = false;
    },

    tryToLogin(){
      const regex = /^[A-Za-z0-9\s]+$/;
      const matchLogin = regex.exec(this.login);
      if(!matchLogin){
        this.showModal = true;
        this.textModal = 'Введен некорректный логин';
      }
      else{
        const matchPassword = regex.exec(this.password);
        if(!matchPassword){
          this.showModal = true;
          this.textModal = 'Введен некорректный пароль';
        }
        else{
          this.loginCheck(

              {
                login: this.login,
                password: this.password
              }
          ).then(response =>{
            localStorage.clear();
            if(response.data.status === "1"){
             localStorage.setItem('token', response.data.token)
              localStorage.setItem('level', response.data.level)
              this.$router.push('/main')
            }
            else{
              this.showModal = true;
              this.textModal = response.data.message;
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

  },
  beforeMount(){
   localStorage.clear();
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
  font-size: 60px;

}
.auth__form-text{

  margin-left: 15px;
  width: 550px;
  justify-content: space-between;
  display: flex;

}

.auth__form-input{
  float: right;
  width: 370px;
  font-size: 26px;
  padding: 0 10px;
  height: 50px;
  border-radius: 20px;

  font-family: 'Jura', sans-serif;
}
.auth__form-button{
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
    margin: 5% auto 0;
    width: 300px;
    font-size: 30px;
  }

  .auth__form-title{
    font-size: 40px;
  }
  .auth__form-input{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: -12px;
    font-size: 22px;
    width: 270px;
    height: 30px;
    text-align: center;
  }
  .auth__form-text{
    margin: 0 auto;
    width: 270px;
    display: block;
    text-align: center;

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