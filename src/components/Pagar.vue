<template>
    <v-row
    justify="center"
    >
        <v-dialog
        v-model="dialog"
        max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                outlined
                text
                v-bind="attrs"
                v-on="on"
                @click="toggleDialog"
                >
                    Pagar
                </v-btn>
            </template>
            <v-card>
                <v-card-title
                class="text-subtitle-1 px-9 py-10"
                >
                    ¡El pago se ha procesado exitosamente!
                </v-card-title>
                <v-card-text
                class="text-center pb-10"
                >
                    <v-icon 
                    large 
                    color="green"
                    >
                        mdi-check-outline
                    </v-icon>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        toggleDialog() {
            this.dialog = !this.dialog
        }
    }
};
</script>

<style scoped>
</style>
