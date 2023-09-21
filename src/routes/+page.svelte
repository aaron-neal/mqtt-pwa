<script>
    import {Card} from "flowbite-svelte";
    import {base} from "$app/paths";
    import { Shadow } from 'svelte-loading-spinners';
    import * as mqtt from 'mqtt/dist/mqtt.min'

    const client = mqtt.connect('wss://3ways.aaronneal.co.uk:1884',{username:'homeassistant', password:'RniR9giMBhkmSU'})

    let connected = false
    let error = false
    let retryCount = 0;

    client.on("connect", () => {
        error = false;
        setTimeout(function(){
            connected = true;
            client.subscribe("cmnd/gate", (err) => {
                if (!err) {
                    
                }
            });
        }, 2000)
    });

    client.on("message", (topic, message) => {
        // message is Buffer
        console.log(message.toString());
        client.end();
    });

    client.on("close", () => {
        retryCount++;
        if(retryCount > 3){
            client.end();
            error = true;
        }
        console.log("MQTT connection closed");
        connected = false
    });

    client.on('error', (a) => {
        console.log('error: ' + a)
        retryCount++;
        if(retryCount > 3){
            client.end();
            error = true;
        }
    })

    function retry(){
        client.reconnect();
        error = false;
        retryCount = 0;
    }

    function send(){
        client.publish("cmnd/gate", "open");
    }
</script>

<!-- <Card href="{base}/docs" class="mx-auto">
    <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Replace this page with your homepage</h1>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Click to navigate to instructions</p>
</Card> -->

<section >
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your ultimate door opening app</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Wait for a connection and then open the door!</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-col sm:justify-center sm:space-y-0 sm:space-x-4">
            {#if !connected && !error}
                <div class="spinner-item">
                    <div class="spinner-title text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Connecting</div>
                    <Shadow size="60" color="#546cd3" unit="px" duration="1s"/>
                </div>
            {:else if connected}
                <div>   
                    <button on:click={send} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Open Door 
                    </button>
                </div>
            {:else if error}

                <p class="mb-8 text-lg font-normal text-red-500 lg:text-xl sm:px-16 xl:px-48 dark:text-red-400">CONNECTION ERORR</p>
                <div> 
                    <button on:click={retry} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Retry
                    </button>
                </div>

            {/if}
        </div>
    </div>
</section>

<style>
    .spinner-item {
		min-width: 250px;
		min-height: 250px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.spinner-title {
		position: absolute;
		top: 20px;
	}
</style>