<template>
  <div class="test-unit">

    <p>{{this.name}}</p>
    <p :class="[(this.status === 'На рассмотрении') ? 'decided' : (this.status === 'Одобрено') ? 'approved' : 'declined']"> Статус: {{ this.status }}</p>


  </div>
</template>

<script>



export default {


  props: ["id","testName","statusName"],
  data(){
    return {
      number: this.id,
      name: this.testName,
      status: this.statusName

    }
  },

  methods:{

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

.test-unit{
  background-color: white;
  margin-top: 50px;
  text-align: center;
  font-size: 30px;
  font-family: 'Jura', sans-serif;
  padding: 10px;
  margin-left: 5%;
  margin-right: 5%;
  border: 1px solid darkblue;
}
.decided{
  font-weight: 900;
  color: darkblue;
}

.approved{
  font-weight: 900;
  color: darkgreen;
}

.declined{
  font-weight: 900;
  color: darkred;
}

@media(max-width: 1300px) {
  .test-unit{
    font-size: 24px;
  }

}
@media(max-width: 800px) {
  .test-unit{
    font-size: 16px;
  }

}

</style>