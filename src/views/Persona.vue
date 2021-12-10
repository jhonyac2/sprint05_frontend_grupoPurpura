
<template>
<img alt="Vue logo" src="../assets/logo01.jpg">
  <div id="reserva">
  
    <table id="tblData">
      <thead>
        <tr>
          <td colspan="2">Reservas</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Documento</td>
          <td>
            <input type="hidden" v-model="id" />
            <input type="text" v-model="documento" />
          </td>
        </tr>
        <tr>
          <td>Nombre</td>
          <td>
            <input type="text" v-model="nombre" />
          </td>
        </tr>
        <tr>
          <td>Apellido</td>
          <td>
            <input type="text" v-model="apellido" />
          </td>
        </tr>
        <tr>
          <td>Correo</td>
          <td>
            <input type="text" v-model="correo" />
          </td>
        </tr>
        <tr>
          <td>Telefono</td>
          <td>
            <input type="text" v-model="telefono" />
          </td>
        </tr>
        <tr>
          <td>Fecha de reserva</td>
          <td>
            <input type="text" v-model="fecha_reserva" />
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
          <td colspan="6"><center>Listado de reservas</center></td>
        </tr>
        <tr>
          <td>Documento</td>
          <td>Nombre</td>
          <td>Apellido</td>
          <td>Correo</td>
          <td>Telefono</td>
          <td>Fecha de Reserva</td>
          
        </tr>
      </thead>
      <tbody>        
        <tr v-for="item in listData" :key="item.id">
          <td>{{item.documento}}</td>
          <td>{{item.nombre}}</td>
          <td>{{item.apellido}}</td>
          <td>{{item.correo}}</td>
          <td>{{item.telefono}}</td>
          <td>{{item.fecha_reserva}}</td>
          
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
  name:'Reserva',
  data() {
    return {
      id:0,
      documento:'',
      nombre:'',
      apellido:'',
      correo:'',
      telefono:'',
      fecha_reserva:'',
      
      listData:[]
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    findByid:function(id){
      // metodo para consutlar por el ig del boton impreso en la vista
      axios.get('http://localhost:9000/api/reserva/'+id).then(result =>{
        this.id = result.data.id;
        this.documento = result.data.documento;
        this.nombre = result.data.nombre;
        this.apellido = result.data.apellido;
        this.correo = result.data.correo;
        this.telefono = result.data.telefono;
        this.fecha_reserva = result.data.fecha_reserva;
        
      })
    },
    Agregar:function(){
      let data = {
        documento:this.documento,
        nombre:this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono:  this.telefono,  
        fecha_reserva:  this.fecha_reserva
               
      };
      axios.post('http://localhost:9000/api/reserva',data).then(result =>{
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
        documento:this.documento,
        nombre:this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono:  this.telefono,
        fecha_reserva:  this.fecha_reserva
               
      };

      axios.put('http://localhost:9000/api/reserva/'+this.id,data).then(result =>{
        if(result.data){
          alert('El registro se modificó de forma correcta.');
          this.loadData();
          this.clearList();
        }
      });
      
    },
    Eliminar:function(){
      axios.delete('http://localhost:9000/api/reserva/'+this.id,).then( () =>{
        alert('El registro se eliminó de forma correcta.');
        this.loadData();
        this.clearList();
      });
    },
    loadData:function(){
      axios.get('http://localhost:9000/api/reserva').then(result =>{
        this.listData = result.data
      })
    },
    clearList:function(){
       this.id = 0;
        this.documento ='';
        this.nombre ='';
        this.apellido ='';
        this.correo ='';
        this.telefono ='';
        this.fecha_reserva ='';
        
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