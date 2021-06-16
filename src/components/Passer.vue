<template>
  <div class="passer">

    <p> « {{this.test}} »</p>
    <p> Категория: {{this.category_name}}</p>
    <p> Всего вопросов: {{this.the_counter}}</p>
    <button class="passer__button">
      ПРОЙТИ ТЕСТ
    </button>
  </div>
</template>

<script>
export default {
  props: ["test_id", "cat_id", "cat_name", "test_name", "counter"],
  data() {
    return {
      id: this.test_id,
      category_id: this.cat_id,
      category_name: this.cat_name,
      test: this.test_name,
      the_counter: this.counter

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.passer{
  background-color: white;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  border: 1px solid black;
  margin: 60px 5%;
  text-align: center;
  padding: 15px;

}

.passer__button{
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
@media(max-width: 1100px) {
  .passer{
    font-size: 24px;
  }
}
@media(max-width: 700px) {

  .passer__button{
    font-size: 24px;
    width: 200px;
    height: 50px;
  }
}
</style>