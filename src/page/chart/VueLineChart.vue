<template>
  <div class="small">
    <line-chart :height="160" :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: '#F5B7B3'
              },
              gridLines: {
                display: true
              }
            }]
          },
          legend: {
            display: false
          }
        }
      }
    },
    mounted () {
      this.fillData ()
    }
    ,
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt (), this.getRandomInt (), this.getRandomInt (), this.getRandomInt ()],
          datasets: [
            {
              fill: false,
              data: [this.getRandomInt (), this.getRandomInt (), this.getRandomInt (), this.getRandomInt ()],
              borderColor: '#F5B7B3',
              borderWidth: 2,
              borderCapStyle: 'square'
            }
          ]
        }
      }
      ,
      getRandomInt () {
        return Math.floor (Math.random () * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 100%;
    height: 7rem;
    margin: 0 auto;
    background-color: #EB655B;
    padding: 1rem .3rem;
  }
</style>

