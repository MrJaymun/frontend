<template>
  <div class="text-zone">
    <div class="adder">
      <div class="adder__element">
        <p class="adder__text-question">Введите вопрос</p>
        <textarea class="adder__text-area" maxlength="255"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" name="element">
          <p class="adder__text">Первый вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" name="element" >
          <p class="adder__text">Второй вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" name="element">
          <p class="adder__text">Третий вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255"></textarea>
      </div>
      <div class="adder__element">
        <div class="adder__small-block">
          <input type="radio" name="element">
          <p class="adder__text">Четвертый вариант ответа</p>
        </div>

        <textarea class="adder__text-area" maxlength="255"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question"
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.text-zone{
  background-color: white;
  padding: 5px;
  border: 1px solid black;
 margin-top: 10px;
  margin-left: -20px;
}
.adder{
  margin-top: 20px;
  font-family: 'Jura', sans-serif;
  width: 100%;
}
.adder__element{
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 10px 0 0 auto;
}

.adder__small-block{
  display: flex;
  align-items: center;
}
.adder__text{
  vertical-align: middle;
  text-align: center;
  display: block;
  font-size: 24px;
  margin-right: 10px;
}
.adder__text-question{
  vertical-align: middle;
  text-align: left;
  display: block;
  font-size: 24px;
  margin-right: 10px;
}
.adder__text-area{
  font-size: 20px;
  font-family: 'Jura', sans-serif;
  resize: none;
  height: 95px;
  width: 98%;

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
    width: 95%;
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