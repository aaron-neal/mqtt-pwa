<script>
    import {Card} from "flowbite-svelte";
    import {base} from "$app/paths";
    import mqtt_client from 'u8-mqtt'

    let my_mqtt = mqtt_client()
    .with_websock('wss://workbench.exinetechnology.com:1884')
    .with_autoreconnect()

    async function connect(){
        my_mqtt.connect({username:'admin', password:'QN5BsvuHGSuL5F'});
        my_mqtt.subscribe_topic('u8-mqtt/demo-simple/:topic',(pkt, params, ctx) => {
        console.log('topic packet', params, pkt, pkt.json())
    })

    await my_mqtt.json_send('u8-mqtt/demo-simple/live',
        { note: 'from README example',
        live: new Date().toISOString() }
        )
    }

   

    // await my_mqtt.connect()

   
</script>

<!-- <Card href="{base}/docs" class="mx-auto">
    <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Replace this page with your homepage</h1>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Click to navigate to instructions</p>
</Card> -->

<section >
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your ultimate door opening app</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Wait for a connection and then open the door!</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button on:click={connect} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Open Door 
            </button>

        </div>

    </div>
</section>