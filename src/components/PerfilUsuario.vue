<template>
    <div>
        <v-btn depressed color="error" @click="cerrarSesion">
            Cerrar Sesion
        </v-btn>
    </div>
</template>
<script>
import swal from 'sweetalert'
export default {
    data: () => ({

    }),
    methods:{
        cerrarSesion(){
            localStorage.removeItem('token')
            swal("Terminar Sesion","Has terminado la sesion exitosamente","success")
            this.$router.push('/')
        }
    },

}
</script>