<template>
  <div class="page">
    <div class="page__header">
      <div class="header__nav">
        <button class="header__button">Личный кабинет</button>
        <button class="header__button">Рейтинг</button>
        <button class="header__button" @click="$router.push('/main')">Главная страница</button>
      </div>
    </div>
    <div class="text-zone">
      <div class="adder">
        <div class="adder__element">
            <p class="adder__text">Введите название теста</p>
          <textarea class="adder__text-area" maxlength="255"></textarea>
        </div>
        <Question></Question>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Question from "@/components/Question";


export default {
  components: {Question},
  data(){
    return{

    }
  },
  methods:{
    ...mapActions(['firstLevel']),

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
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.page{
  background-color: #f1f5fe;
}
.page__header{
  background-color: white;
}
.header__nav{
  display: flex;
  margin: 10px 5%;
  flex-direction: row-reverse;
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
  margin: 0 auto;
}
.adder__element{
  display: grid;
  align-items: center;
  grid-template-columns: 30% 70%;
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
