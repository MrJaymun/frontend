<template>
  <div class="page">
    <div class="page__header">
      <div class="header__nav">
        <button class="header__button" @click="$router.push('/personal')">Личный кабинет</button>
        <button class="header__button" v-if="isNotUsual" @click="$router.push('/add-test')">Создать тест</button>
        <button class="header__button" @click="$router.push('/main')">Главная страница</button>
      </div>
    </div>
    <div class="block-header">

      <p>ЛУЧШИЕ ПО КОЛИЧЕСТВУ ПРАВИЛЬНЫХ ОТВЕТОВ</p>
    </div>
    <div class="diagram">

      <RatingUnit v-for="item in this.summaryAll"
                  :key="item.position"
                  :id="'Позиция: ' + item.position"
                  :login="'Имя: ' + item.user"
                  :personal="'Всего правильных: ' + item.sum"
                  :maximum="'Всего ответов: ' + item.count"
      >
      </RatingUnit>
      <div class="diagram__you">
        <p>{{this.summarySoloInfo}}</p>
      </div>
    </div>

    <div class="block-header">
      <p>ЛУЧШИЕ ПО ТОЧНОСТИ ОТВЕТОВ</p>
    </div>
    <div class="diagram">

      <RatingUnit v-for="item in this.percentAll"
                  :key="item.position"
                  :id="'Позиция: ' + item.position"
                  :login="'Имя: ' + item.user"
                  :personal="'Процент правильных: ' + item.percent + '%'"
                  :maximum="'Всего ответов: ' + item.count"
      >
      </RatingUnit>

      <div class="diagram__you">
        <p>{{this.percentSoloInfo}}</p>
      </div>

    </div>

  </div>
</template>

<script>

import {mapActions} from "vuex";
import RatingUnit from "@/components/RatingUnit";

export default {
  components: {RatingUnit},
  data() {
    return {
      isNotUsual: false,
      percentSoloInfo: '',
      summarySoloInfo: '',
      percentAll: [],
      summaryAll: []
    }

  },
  methods:{
    ...mapActions(['firstLevel', 'fullRating'])
  },
  beforeMount() {


    if (!localStorage.getItem('token')) {
      this.$router.push('/');
    }
    else{
      this.firstLevel({}).then(response =>{

        if(response.data.result){
          this.isNotUsual = true;
        }
        else{
          this.isNotUsual =  false
        }
      })
    }
    this.fullRating({}).then(response =>{
      if(response.data.status === '1'){
        if(response.data.percentsOnly.length === 0){
          this.percentSoloInfo = 'Вы еще не проходили тесты'
        }
        else{
          this.percentSoloInfo = 'Ваша точность: '  + response.data.percentsOnly[0].question_percent + '%. Всего вопросов: '  + response.data.percentsOnly[0].question_count + '. Ваше место: ' + response.data.percentsOnly[0].row_number
        }
        if(response.data.summaryOnly.length === 0){
          this.summarySoloInfo = 'Вы еще не проходили тесты'
        }
        else{
          this.summarySoloInfo = 'Правильных ответов: ' + response.data.summaryOnly[0].sum + ' из '  + response.data.summaryOnly[0].all + '. Ваше место: ' + response.data.summaryOnly[0].row_number
        }


        response.data.percentsAll.forEach(item => {
          this.percentAll.push({
              position: item.row_number,
              user: item.user_id,
              percent: item.question_percent,
              count: item.question_count
          })
        })



        response.data.summaryAll.forEach(item => {
          this.summaryAll.push({
            position: item.row_number,
            user: item.user_id,
            sum: item.sum,
            count: item.all
          })
        })


      }
    })

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

  border-bottom: 1px solid gray;
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
.block-header{
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-family: 'Jura', sans-serif;
  margin-top: 50px;
}

.diagram{
  margin-left:  5%;
  margin-right: 5%;
  border: 3px solid black;
  padding: 30px;
  background-color: #f1f5fe;
}

.diagram__you{
  width: 80%;
  text-align: center;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  margin: 30px auto 0;
  border-top: 1px solid gray;
}
@media(max-width: 700px) {
  .header__nav{
    flex-direction: column-reverse;
  }

  .header__button{
    width: 90%;
    font-size: 24px;
  }
  .block-header{
    font-size: 24px;
  }

}
@media print{
  @page  {
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
  }
  .page__header{
  display: none;
  }
  .diagram{
    page-break-after: always;
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
  }
  .diagram__you{
    font-size: 22px;
    margin: 0 auto;
    padding: 0;
  }
}
</style>