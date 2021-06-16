<template>
  <div>
    <div class="header">
      <div class="header__nav">
        <button class="header_button" @click="$router.push('/personal')">Личный кабинет</button>
        <button class="header_button">Рейтинг</button>
        <button class="header_button" v-if="isNotUsual" @click="$router.push('/add-test')">Создать тест</button>
      </div>
    </div>
    <div class="filter">
      <p>Введите название теста</p>
      <input class="filter__finder" v-model="filtered" @change="filterText" >
      <p>Выберите категорию</p>
      <select class="filter__selecter" size="1" v-model="theme" @change="filterThemes">
        <option value="0">Все категории</option>
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

    <div class="tests">
      <Passer v-for="passer in this.filteredList"
              :key="passer.id"
              :test_id="passer.id"
              :cat_id="passer.cat_id"
              :cat_name="passer.cat_name"
              :test_name="passer.name"
              :counter="passer.counter"
      >

      </Passer>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Passer from "@/components/Passer";


export default {
  components: {Passer},
  data(){
    return{
      isNotUsual: false,
      filtered: '',
      theme: 0,

    }
  },
  computed:{
    ...mapGetters(['getPassers']),

    filteredList(){
        return this.getPassers.filter(passer => {
          if (this.filtered === '' && (this.theme === 0 || this.theme === '0')) {
            return passer;
          }
          else if (this.filtered === '') {
            return passer.cat_id.toString() === this.theme.toString();
          }
          else if (this.theme === 0) {
            return passer.name.toLowerCase().indexOf(this.filtered.toLowerCase()) !== -1;
          }
          else
          {
            return  (passer.name.toLowerCase().indexOf(this.filtered.toLowerCase()) !== -1 && passer.cat_id.toString() === this.theme.toString());
          }

        })



      },


  },
  methods:{
    ...mapActions(['firstLevel', 'fullAllPassingTests']),
    ...mapMutations(['addPasser', 'clearPasser']),
    filterText(){
      console.log(this.filtered)
    },
    filterThemes(){
      console.log(this.theme)
    },

    fullTheListOfTests(){
      this.clearPasser()
      this.fullAllPassingTests({}).then(response => {
        if(response.data.status === '1'){
          response.data.result.forEach(test => {
            console.log(response.data.result)
              this.addPasser({
                id: test.test_id,
                cat_id: test.test_category_id,
                cat_name: test.test_category_name,
                name: test.test_name,
                counter: test.counter
              })
          })
        }
      })
    }



  },
  beforeMount() {


    if(!localStorage.getItem('token')){
      this.$router.push('/');
    }

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

    this.fullTheListOfTests()
  }


}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');


  .header__nav{
    display: flex;
    margin: 10px 5%;
  flex-direction: row-reverse;
    border-bottom: 1px solid gray;
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

  .filter{
    font-family: 'Jura', sans-serif;
    font-size: 30px;
    text-align: center;
    border: 3px solid black;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
  }

  .filter__finder, .filter__selecter{
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 30px;
    width: 80%;
    height: 50px;
    font-family: 'Jura', sans-serif;
  }

  .tests{
    background-color: #f1f5fe;
    border: 3px solid black;
    margin: 100px 5% 200px;
  }
  @media(max-width: 700px) {
    .header__nav{
      flex-direction: column-reverse;
    }
    .header_button{
      width: 90%;
      font-size: 24px;
    }
    .filter__finder, .filter__selecter, .filter{
      font-size: 22px;
    }
  }
</style>