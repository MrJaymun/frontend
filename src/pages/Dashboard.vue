

<template>
  <div class="page">

    <div class="page__header">
      <div class="header__nav">
        <button class="header__button" @click="$router.push('/main')">Главная страница</button>
        <button class="header__button">Рейтинг</button>
        <button class="header__button" @click="$router.push('/add-test')">Создать тест</button>
      </div>
    </div>
    <div class="block-header">
      <p>ОБЩАЯ ИНФОРМАЦИЯ</p>
    </div>
    <div class="stat">
      <div class="stat__element">
        <p>ВСЕГО ТЕСТОВ</p>
        <input class="stat__input" disabled v-model="allTests">
      </div>
      <div class="stat__element">
        <p>ВСЕГО ОБЫЧНЫХ ПОЛЬЗОВАТЕЛЕЙ</p>
        <input class="stat__input" disabled v-model="usualUsers">
      </div>
      <div class="stat__element">
        <p>ВСЕГО СОЗДАТЕЛЕЙ ТЕСТОВ</p>
        <input class="stat__input" disabled v-model="creatingUsers">
      </div>
      <div class="stat__element">
        <p>ВСЕГО АДМИНИСТРАТОРОВ</p>
        <input class="stat__input" disabled v-model="admins">
      </div>
    </div>

    <div class="block-header">
      <p>ИНФОРМАЦИЯ О ТЕСТАХ</p>
    </div>

    <div>
      <div class="charts__block">
        <v-chart class="charts__unit" :option="statCategory" />
        <v-chart class="charts__unit" :option="statAuthor" />
      </div>

    </div>

    <div class="stat border">
      <div class="stat__element">
        <p>ТЕСТЫ НА РАССМОТРЕНИИ</p>
        <input class="stat__input" disabled v-model="waitingTests">
      </div>
      <div class="stat__element">
        <p>ОДОБРЕННЫЕ ТЕСТЫ</p>
        <input class="stat__input" disabled v-model="approvedTests">
      </div>
      <div class="stat__element">
        <p>ОТКЛОНЕННЫЕ ТЕСТЫ</p>
        <input class="stat__input" disabled v-model="declinedTests">
      </div>
    </div>

    <div class="exit">
      <button class="exit__button" @click="$router.push('/personal')"> ВЕРНУТЬСЯ</button>
    </div>
  </div>


</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import {mapActions} from "vuex";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  components: {
    VChart
  },
  created() {
    window.addEventListener('resize', this.handleResize);

  },
  data() {
    return {
      allTests: 0,
      waitingTests: 0,
      approvedTests: 0,
      declinedTests: 0,
      usualUsers: 0,
      creatingUsers: 0,
      admins: 0,
      statCategory: {
        title: {
          text: "Тесты по категориям",
          left: "center",
          textStyle: {fontSize: 24}
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },


        series: [
          {
            name: "Тесты по категориям",
            type: "pie",
            center: ["50%", "50%"],
            data: [
              { value: 1, name: "Нет соединения с БД" }
            ]
          }
        ]
      },
      statAuthor: {
        title: {
          text: "Тесты по авторам",
          left: "center",
          textStyle: {fontSize: 24}
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },


        series: [
          {
            name: "Тесты по авторам",
            type: "pie",
            center: ["50%", "50%"],
            data: [
              { value: 1, name: "Нет соединения с БД" }
            ]
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['takeDashboard', 'secondLevel']),
    handleResize() {
      window.location.reload();
    }
  },
  beforeMount() {
    if(!localStorage.getItem('token')){
      this.$router.push('/');
    }
    else{
      this.secondLevel({}).then(response => {

        if (!response.data.result) {
          this.$router.push('/main');
        }

      })

      this.takeDashboard({}).then(response => {

        this.statCategory.series[0].data = []
        this.statAuthor.series[0].data = []
        response.data.category.forEach(item => {
          this.statCategory.series[0].data.push({value: item.counter, name: item.test_category_name})
        })
        response.data.users.forEach(item => {
          this.statAuthor.series[0].data.push({value: item.counter, name: item.test_author_name})
        })
        response.data.tests.forEach(item => {
          if(item.test_status_id === 1){
            this.waitingTests = item.counter
          }
          if(item.test_status_id === 2){
            this.approvedTests = item.counter
          }
          if(item.test_status_id === 3){
            this.declinedTests = item.counter
          }
        })
        this.allTests = Number(this.waitingTests) + Number(this.approvedTests) + Number(this.declinedTests)
        response.data.usersCount.forEach(item => {
          if(item.user_category_id === 1){
            this.usualUsers = item.counter
          }
          if(item.user_category_id === 2){
            this.creatingUsers = item.counter
          }
          if(item.user_category_id === 3){
            this.admins = item.counter
          }
        })
      })
    }
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.page{
  margin-bottom: 100px;
}

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

.charts__unit {
  height: 800px;
  width: 100%;
}

.stat{
  margin-left: 5%;
  margin-right: 5%;
  border: 1px solid black;
}

.border{
  border-top: 1px solid white;
}

.stat__element{

  display: grid;
  grid-auto-flow: column;
  font-size: 24px;
  text-align: center;
  font-family: 'Jura', sans-serif;

  padding: 50px;
  grid-template-columns: 40% 60%;

}


.stat__input{
  font-size: 24px;
  text-align: center;
  font-family: 'Jura', sans-serif;
  width: 100%;

}

.charts__block{
  padding-top: 50px;
  padding-bottom: 50px;
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  font-size: 30px;
  border: 1px solid black;
  border-bottom: 1px solid white;
}

.exit__button{
  display: block;
  background-color: darkblue;
  color: white;
  border-radius: 30px;
  font-size: 30px;
  width: 400px;
  height: 60px;
  border: 3px solid darkblue;
  font-family: 'Jura', sans-serif;
  margin: 100px auto 30px;

}
.exit__button:hover{
  background-color: black;
  border: 3px solid black;
}

@media(max-width: 1700px) {
  .charts__block{
    grid-template-columns: 1fr;

  }
}

@media(max-width: 900px) {
  .charts__unit {
    height: 400px;
    margin: 0 auto;
  }
  .stat__element{
    display: block;

  }
  .stat__input{
    height: 50px;
  }
}

@media(max-width: 700px) {
  .header__nav {
    flex-direction: column-reverse;
  }
  .header__button {
    width: 90%;
    font-size: 24px;
  }
  .stat__element{
    font-size: 18px;
  }
  .exit__button{
    font-size: 24px;
    width: 250px;
    height: 50px;
  }
}
</style>