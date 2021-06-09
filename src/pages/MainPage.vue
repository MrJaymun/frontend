<template>
  <div>
    <div class="header">
      <div class="header__nav">
        <button class="header_button">Личный кабинет</button>
        <button class="header_button">Рейтинг</button>
        <button class="header_button" v-if="isNotUsual" @click="$router.push('/add-test')">Создать тест</button>
      </div>
    </div>
    <p>Оно работает</p>
  </div>
</template>

<script>
import {mapActions} from "vuex";


export default {
  data(){
    return{
      isNotUsual: false
    }
  },
  methods:{
    ...mapActions(['firstLevel']),

  },
  beforeMount() {


    if(!localStorage.getItem('token')){
      this.$router.push('/');
    }
  /*
    if(localStorage.getItem('level') > 1){
      this.isNotUsual = true;
    }
    else{
      this.isNotUsual =  false
    }

   */
    if(localStorage.getItem('level') != null){

      localStorage.removeItem('level')
      window.location.reload();
    }
    this.firstLevel({}).then(response =>{

      if(response.data.result){
        this.isNotUsual = true;
      }
      else{
        this.isNotUsual =  false
      }
    })


  }


}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');


  .header__nav{
    display: flex;
    margin: 10px 5%;
  flex-direction: row-reverse;
  }
  .header_button{
    width: 25%;
    height: 80px;
    margin: 3%;
    font-size: 30px;
    font-family: 'Jura', sans-serif;
    border: 0;
    background-color: white;
  }
  .header_button:hover{
   text-decoration: underline;

  }
  @media(max-width: 700px) {
    .header__nav{
      flex-direction: column-reverse;
    }
    .header_button{
      width: 90%;
      font-size: 24px;
    }
  }
</style>