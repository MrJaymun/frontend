<template>
  <div class="page">
    <div class="block-header">
      <p>ИНФОРМАЦИЯ О ПРОХОЖДЕНИИ ТЕСТОВ</p>
    </div>
    <div class="changer">

      <button class="changer__button" :class="[(this.isAllTimeActive === false) ? 'active' : 'unactive']" @click="getInfoAboutOneDay">ОДИН ДЕНЬ</button>
      <button class="changer__button" :class="[(this.isAllTimeActive === true) ? 'active' : 'unactive']" @click="getInfoAboutAllTime">ВСЕ ВРЕМЯ</button>
      <div class="changer__calendar">
        <p class="calendar__text-element">
          ВЫБОР ДАТЫ
        </p>
        <datepicker class="changer__calendar-unit" v-model="date"   ></datepicker>
      </div>

    </div>

    <button class="exit-button" @click="$router.push('/personal')"> ВЕРНУТЬСЯ</button>

    <div class="log-block">
      <p class="log-block__text-element" v-if="this.getLogs.length === 0">
        Прохождений в этот день нет
      </p>
      <UnitOfLog  v-for="log in this.getLogs"
                  :key = "log.id"
                  :id = "log.id"
                  :user = "log.user"
                  :begintime = "log.begintime"
                  :duration = "log.duration"
                  :testname = "log.testname"
                  :status = "log.status"
      >
      </UnitOfLog>
    </div>



  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import {mapActions, mapGetters, mapMutations} from "vuex";
import UnitOfLog from "../components/UnitOfLog";
export default {
  components: {
    UnitOfLog,
    Datepicker
  },
  computed:{
    ...mapGetters(['getLogs']),
  },
  data() {
    return {
      date: '',
      isAllTimeActive: false
    }
  },

  methods: {
    ...mapActions(['getAllLogs', 'getOneDayLogs', 'secondLevel']),
    ...mapMutations(['addLogToArray', 'clearLogs']),
    getInfoAboutOneDay() {

        this.clearLogs()
        let time = moment(this.date).format('YYYY-MM-DD')

        if (time === 'Invalid date') {
          time = moment(new Date().toString()).format('YYYY-MM-DD')
        }

        this.getOneDayLogs({time: time}).then(response => {

          if (response.data.status === '1') {
            var allLogs = response.data.result
            allLogs.forEach(log => {

              this.addLogToArray({
                user: log.user,
                begintime: log.begintime,
                duration: log.duration,
                testname: log.testname,
                status: log.status
              })
            })
          }
        })
        this.isAllTimeActive = !this.isAllTimeActive


    },
    getInfoAboutAllTime() {
      if (!this.isAllTimeActive) {
        this.clearLogs()
        this.getAllLogs({}).then(response => {
          if (response.data.status === '1') {
            var allLogs = response.data.result
            allLogs.forEach(log => {

              this.addLogToArray({
                user: log.user,
                begintime: log.begintime,
                duration: log.duration,
                testname: log.testname,
                status: log.status
              })
            })
          }
        })
        this.isAllTimeActive = !this.isAllTimeActive
      }

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
    }
    this.getInfoAboutAllTime()
  }


}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.page{
  margin-bottom: 100px;
}

.block-header, .calendar__text-element, .log-block__text-element{
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  margin-top: 50px;
}

.changer, .log-block{
  margin-left: 5%;
  margin-right: 5%;
  border: 1px solid black;
  background-color: #f1f5fe;
  margin-bottom: 100px;
}
.changer__button{
  border-radius: 30px;
  width: 44%;
  height: 80px;
  margin: 3%;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  border: 1px solid black;
  background-color: white;
}

.changer__calendar{
  width: 50%;
  font-size: 30px;
  text-align: center;

}
.changer__calendar-unit{
  align-items: center;
  text-align: center;
  height: 50px;
  margin-bottom: 10px;
}

.changer__button:hover{
  background-color: darkblue;
  color: white;
}

  .active{
    color: black;
  }
  .unactive{
    color: lightgrey;
  }

.exit-button{
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

 .exit-button:hover{
  background-color: black;
  border: 3px solid black;
}

  @media(max-width: 800px) {
    .calendar__text-element, .log-block__text-element{
      font-size: 24px;
    }
    .exit-button{
      font-size: 24px;
      width: 250px;
      height: 50px;
    }
  }

</style>