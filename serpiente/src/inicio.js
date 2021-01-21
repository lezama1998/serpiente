var app = new Vue({
    el: '#app',
    data: {
      Titulo: 'SNAKE',
      NombreJugador:"",
     
    },

    methods:{
    enblanco(){
        if(this.NombreJugador===""){
          document.getElementById("btnjugar").disabled=true;  
        }
        else {
            document.getElementById("btnjugar").disabled=false;  
        }

    },
    computed:{}
        
    }
  })