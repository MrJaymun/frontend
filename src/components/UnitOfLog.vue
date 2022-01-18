<template>
  <div class="block">
    <p>
      Пользователь: {{this.us}}
    </p>

    <p>
      Название теста: {{this.name}}
    </p>
    <p>
      Итог: {{this.st}}
    </p>


      <p>
        Дата начала: {{this.begin}}
      </p>
      <p>
        Время на тест: {{this.dur}}
      </p>

  </div>
</template>

<script>
export default {
  props: ["id", "user","begintime", "duration", "testname", "status"],
  data(){
    return {
      number: this.id,
      us: this.user,
      begin: this.begintime,
      dur: this.duration,
      name: this.testname,
      st: this.status
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');
  .block{
    border: 1px solid black;
   text-align: center;

    font-family: 'Jura', sans-serif;
    font-size: 30px;
    background-color: white;
    margin: 50px;
    padding: 20px;
  }
@media(max-width: 800px) {
  .block{
    font-size: 24px;
  }
}


</style>