<template>
    <div>
        <v-img  alt="Imagen Fondo" src="../assets/fondoLogin.jpeg" width="100%"  >
        </v-img>
        <v-card>
            <v-card-title>
                Iniciar Sesion
            </v-card-title>
        <v-container>
        
            <v-row>
                <v-col>
                    <v-text-field label="Email" v-model="login.email" type="email">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Contraseña" v-model="login.password" type="password">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-bottom-sheet>Iniciar Sesion
                    </v-bottom-sheet>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
        </v-container>
        </v-card>
    </div>
</template>
<script>
export default {
    
}
</script>