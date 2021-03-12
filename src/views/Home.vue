<template>
    <v-container
    class="my-0 mx-0 pa-16"
    >
        <v-card
        class="margen"
        >
            <v-card-title>
                <v-row
                >
                    <v-col
                    cols="3"
                    >
                    <p
                    >
                        {{ headers.sku }}
                    </p>
                    </v-col>

                    <v-col
                    cols="3"
                    >
                        {{ headers.name }}
                    </v-col>

                    <v-col
                    cols="3"
                    >
                        {{ headers.quantity }}
                    </v-col>

                    <v-col
                    cols="3"
                    >
                        {{ headers.price }}
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>

        <v-list
        dense
        outlined
        class="mb-10"
        >
            <v-dialog
            v-model="dialogDetail"
            width="900px"
            >
                <template v-slot:activator="{ on, attrs}">
                    <v-list-item-group
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        class="justify-center"
                        @click="verDetalle(item)"
                        >
                            <v-row
                            no-gutters
                            >
                                <v-col
                                cols="3"
                                >
                                    {{ item.sku }}
                                </v-col>
                                <v-col
                                cols="3"
                                >
                                    {{ item.name }}
                                </v-col>
                                <v-col
                                cols="3"
                                >
                                    {{ item.quantity }}
                                </v-col>
                                <v-col
                                cols="3"
                                >
                                    {{ item.price }}
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list-item-group>
                </template>
                <v-card>
                    <v-card-title>
                        Número de Orden: {{ product.number }}
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col
                            cols="3"
                            >
                            SKU: {{ product.sku }}
                            </v-col>
                            <v-col
                            cols="3"
                            >
                            Name: {{ product.name }}
                            </v-col>
                            <v-col
                            cols="3"
                            >
                            Quantity: {{ product.quantity }}
                            </v-col>
                            <v-col
                            cols="3"
                            >
                            Price: {{ product.price }}
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-list>
        <formulario/>   
        <pagar/>
    </v-container>
</template>

<script>
import Formulario from '../components/Formulario'
import Pagar from '../components/Pagar'

export default {
    components: { Formulario, Pagar },
    data () {
        return {
            dialogDetail: false,
            headers: {
                sku: 'SKU',
                name: 'Name',
                quantity: 'Quantity',
                price: 'Price'
            },
            product: {}
        }
    },
    created () {
        this.fetchData()
    },
    computed: {
        items() {            
            return this.$store.state.products
        }
    },
    methods: {
        async fetchData () {
            let url = 'https://eshop-deve.herokuapp.com/api/v2/orders'
            let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ'

            await fetch( url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                let orders = data.orders;
                let items = []
                orders.forEach(item => {
                    items.push({
                        id: item.id,
                        number: item.number,
                        sku: item.items[0].sku,
                        name: item.items[0].name,
                        quantity: item.items[0].quantity,
                        price: item.items[0].price
                        })
                })
                this.$store.commit('setProducts', items)
            })

        },
        verDetalle(item) {
            this.$store.commit('setProduct', item)
            this.product = this.$store.state.product
            console.log(this.$store.state.product)
            this.dialogDetail = !this.dialogDetail
        }
    }
};
</script>

<style scoped>
    .margen {
        margin-bottom: 10px;
    }
</style>
