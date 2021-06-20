<template>
  <div clas="unit">
    <div class="unit__body">
      <p class="unit__body-element">{{this.place}}</p>
      <p class="unit__body-element">{{this.name}}</p>
      <p class="unit__body-element">{{this.result}}</p>
      <p class="unit__body-element">{{this.could}}</p>
    </div>

  </div>
</template>

<script>
export default {
    props: ["id","login","personal", "maximum"],
  data(){
      return{
        place: this.id,
        name: this.login,
        result: this.personal,
        could: this.maximum
      }

  }
}
</script>

<style scoped>
.unit__body{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  text-align: center;
  border-bottom: 1px solid black;

}

@media (max-width: 1100px) {
  .unit__body{
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 800px) {
  .unit__body{
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .unit__body{
    font-size: 22px;
  }
}

@media print{
  @page  {
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
  }
  .unit__body-element{
    margin-bottom: 0;
    margin-top: 0;
    padding: 3px;
    font-size: 20px;
  }
  .unit__body{
    grid-template-columns: 1fr 1fr;
  }

}
</style>