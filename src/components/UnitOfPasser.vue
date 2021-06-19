<template>
  <div class="unit">
    <p>
      {{this.name}}
    </p>
    <div class="unit__buttons">
      <button @click="doFirst" class="unit__buttons-element" :class="[(this.chosen === 1) ? 'chosen' : 'unchosen']">
        {{this.first}}
      </button>
      <button @click="doSecond" class="unit__buttons-element" :class="[(this.chosen === 2) ? 'chosen' : 'unchosen']">
        {{this.second}}
      </button>
      <button @click="doThird" class="unit__buttons-element" :class="[(this.chosen === 3) ? 'chosen' : 'unchosen']">
        {{this.third}}
      </button>
      <button @click="doFourth" class="unit__buttons-element" :class="[(this.chosen === 4) ? 'chosen' : 'unchosen']">
        {{this.fourth}}
      </button>
    </div>


  </div>
</template>

<script>
import { mapMutations} from "vuex";

export default {
  props: ["id", "questionName","firstAnswer", "secondAnswer", "thirdAnswer", "fourthAnswer", "firstAnswerId", "secondAnswerId", "thirdAnswerId", "fourthAnswerId", "chosenAnswer"],
  data(){
    return {
      number: this.id,
      name: this.questionName,
      first: this.firstAnswer,
      second: this.secondAnswer,
      third: this.thirdAnswer,
      fourth: this.fourthAnswer,
      firstId: this.firstAnswerId,
      secondId: this.secondAnswerId,
      thirdId: this.thirdAnswerId,
      fourthId: this.fourthAnswerId,

    }
  },
  computed: {
    chosen:{
      get(){return this.chosenAnswer},
      set(){}
    }
  },

  methods: {
    ...mapMutations(['changeDecision']),
    doFirst(){
      this.change(1)
    },
    doSecond(){
      this.change(2)
    },
    doThird(){
      this.change(3)
    },
    doFourth(){
      this.change(4)
    },

    change(newIdea){
      this.changeDecision({
        id: this.id,
        name: this.name,
        first: this.first,
        second: this.second,
        third: this.third,
        fourth: this.fourth,
        firstId: this.firstId,
        secondId: this.secondId,
        thirdId: this.thirdId,
        fourthId: this.fourthId,
        chosenAnswer: newIdea
      })
      console.log(this.$store.getters.getCurrentQuestions)
    }

  }

}

</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

  .unit{
  border: 3px solid darkblue;
  margin: 20px;
  background-color: #f1f5fe;
  padding: 10px;

}

  .unit__buttons{
  display: grid;
  grid-template-columns: 1fr;
}
  .unit__buttons-element{
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 30px;
  border: 3px solid black;
}
  .chosen{
  background-color: darkblue;
    color: white;
    border: 3px solid darkblue;
}
  .unchosen{
    background-color: white;
    color: black;
    border: 3px solid black;
}

  @media(max-width: 800px) {
  .unit__buttons-element, .unit{
  font-size: 24px;
}

}
  @media(max-width: 500px) {
  .unit__buttons-element, .unit{
  font-size: 16px;
  padding: 3px;

}

}
</style>