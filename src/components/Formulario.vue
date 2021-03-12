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
                >
                Añadir Productos
                </v-btn>
            </template>

            <v-card>
                <v-card-title
                class="pb-0"
                >
                    <span class="headline">Nuevo Producto</span>
                </v-card-title>
                <v-form
                @submit.prevent="submit"
                class="mt-0"
                ref="form"
                v-model="valido"
                lazy-validation
                >
                    <v-card-text
                    class="pt-0"
                    >
                        <v-container>
                            <v-row>
                                <v-col
                                cols="12"
                                >
                                    <v-text-field
                                    v-model.trim="sku"
                                    :rules="reglasSKU"
                                    label="SKU"
                                    required
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                >
                                    <v-text-field
                                    v-model.trim="name"
                                    :rules="reglasName"
                                    label="Name"
                                    required
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="6"
                                >
                                    
                                    <v-text-field
                                        class="spin"
                                        v-model="quantity"
                                        :rules="reglasQuantity"
                                        @focus="$event.target.select()" 
                                        type="number"
                                        label="Quantity"
                                        clearable
                                        outlined
                                        shaped
                                        >
                                    </v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="6"
                                >
                                    <v-text-field
                                        class="spin"
                                        v-model="price"
                                        :rules="reglasPrice"
                                        @focus="$event.target.select()" 
                                        type="number"
                                        label="Price"
                                        clearable
                                        outlined
                                        shaped
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*campos obligatorios</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        :disabled="!valido"
                        class="mb-2 mr-1"
                        color="green"
                        :dark="valido"
                        @click="validar"
                        type="submit"
                        >
                            Agregar
                        </v-btn>

                        <v-btn
                        class="mb-2"
                        color="red"
                        dark
                        @click="reset"
                        >
                            Borrar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            valido: false,
            sku: '',
            reglasSKU: [
                v => !!v || 'Campo Obligatorio',
            ],
            name: '',
            reglasName: [
                v => !!v || 'Campo Obligatorio',
            ],
            quantity: 0,
            reglasQuantity: [
                v => !!v || 'Campo Obligatorio',
                v => (v && v > 0) || 'La cantidad debe ser positiva'
            ],
            price: 0,
            reglasPrice: [
                v => !!v || 'Campo Obligatorio',
                v => (v && v > 0) || 'El precio debe ser positivo'
            ],
        }
    }, 
    methods: {
        validar () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        submit () {
            this.$store.commit('addProduct', {
                number: Math.ceil(Math.random()*10000),
                sku: this.sku,
                name: this.name,
                quantity: this.quantity,
                price: this.price
            })
            this.dialog = !this.dialog
        }
    }
};
</script>

<style>
    .spin input[type='number'] {
        -moz-appearance:textfield;
    }
    .spin input::-webkit-outer-spin-button,
    .spin input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>

