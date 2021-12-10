<template>
  <div id="habitacion">
    <table id="tblData">
      <thead>
        <tr>
          <td colspan="2">habitaciones</td>
        </tr>
      </thead>
      <tbody>
        
        <tr>
          <td>numero de habitacion</td>
          <td>
            <input type="text" v-model="nhabitacion" />
          </td>
        </tr>
        <tr>
          <td>cantidad de personas</td>
          <td>
            <input type="text" v-model="cantidad" />
          </td>
        </tr>
        
        <tr>
          <td colspan="2">
            <button @click="Agregar">Guardar</button>
            <button @click="Modificar">Modificar</button>
            <button @click="Eliminar">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <br />
    <table id="tblSalida">
      <thead id="encabezado">
        <tr>
          <td colspan="6"><center>Listado de habitaciones</center></td>
        </tr>
        <tr>
          
          <td>numero de habitacion</td>
          <td>capacidad de huespedes</td>
          
        </tr>
      </thead>
      <tbody>        
        <tr v-for="item in listData" :key="item.id">
          
          <td>{{item.nhabitacion}}</td>
          <td>{{item.cantidad}}</td>
          
          <!-- boton para obtener el id de cada registro -->
          <td><button @click="findByid(item.id)">➤</button></td>                   
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'habitacion',
  data() {
    return {
      id:0,
      
      nhabitacion:'',
      cantidad:'',
      
      listData:[]
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    findByid:function(id){
      // metodo para consutlar por el ig del boton impreso en la vista
      axios.get('http://localhost:9000/api/habitacion/'+id).then(result =>{
        this.id = result.data.id;
        
        this.nhabitacion = result.data.nhabitacion;
        this.cantidad = result.data.cantidad;
        
      })
    },
    Agregar:function(){
      let data = {
        
        nhabitacion:this.nhabitacion,
        cantidad: this.cantidad,
                
      };
      axios.post('http://localhost:9000/api/habitacion',data).then(result =>{
        if(result.data){
          alert('El registro se guardó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });
      
    },
    Modificar:function(){
      let data = {
        id:this.id,
        
        nhabitacion:this.nhabitacion,
        cantidad: this.cantidad,
                
      };

      axios.put('http://localhost:9000/api/habitacion/'+this.id,data).then(result =>{
        if(result.data){
          alert('El registro se modificó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });
      
    },
    Eliminar:function(){
      axios.delete('http://localhost:9000/api/habitacion/'+this.id,).then( () =>{
        alert('El registro se eliminó de forma correcta.');
        this.loadData();
        this.clearList();
      });
    },
    loadData:function(){
      axios.get('http://localhost:9000/api/habitacion').then(result =>{
        this.listData = result.data
      })
    },
    clearList:function(){
       this.id = 0;
        
        this.nhabitacion ='';
        this.cantidad ='';
        
    }
  },  
}
</script>

<style>
    #tblData{
        background-color: darkslategrey;
        color: white;
        margin-left: 5%;
        width: 30%;
    }
    #tblSalida{
        background-color: black;
        color: coral;
        margin-left: 5%;
        width: 60%;
    }

    input{
        width: 90%;
    }

    #encabezado{
      color:white;
      font-size: 20px;
      text-align: center;
    }
</style>