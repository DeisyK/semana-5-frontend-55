<template>
    <div>    
        <div>
            <v-card
                class="mx-auto"
                max-width="344"
                >
                <v-img
                   :src="member.image"
                    height="200px"
                    width="250px"
                ></v-img>
            
                <v-card-title>
                   {{member.nombre}}
                </v-card-title>
            
                <v-card-subtitle>
                    {{member.rol}}
                </v-card-subtitle>
            
                <v-card-actions>
                    <v-btn
                    color="orange lighten-2"
                    text
                    >
                    Conoceme
                    </v-btn>
            
                    <v-spacer></v-spacer>
            
                    <v-btn
                    icon
                    @click="show = !show"
                    >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>
            
                <v-expand-transition>
                    <div v-show="show">
                    <v-divider></v-divider>
            
                    <v-card-text>
                        {{member.descripcion}}
                    </v-card-text>
                    </div>
                </v-expand-transition>
                </v-card>

        </div>
     
    </div>
</template>

<script>
    export default {
        name: "TeamCard",
        props: ['member'],

        data: () => ({
        show: false,
             }),
        
       }
</script>

<style scoped>

</style>



