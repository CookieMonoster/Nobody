<template>
	<div class="mb-2 md:mb-4 last:mb-0" :class="hidePinned ? 'hidden' : 'flex'">
		<!-- Card -->
		<div class="relative flex w-full bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-transparent sm:border sm:rounded-sm dark:text-gray-100">
			<!-- Details -->
			<div class="flex flex-col flex-grow">
				<div class="flex flex-shrink-0 items-center justify-between p-2.5 border-b dark:border-gray-700 dark:border-opacity-70">
					<div class="flex items-center">
						<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 leading-4">
							<!-- Author Username -->
							<a v-if="author == '5f0d9404cfd1ebeda471fb3cebd4040e28c80e67'" target="_blank" rel="noopener noreferrer" v-bind:href="url">
								Leo Jiang - Creator of Nobody Chain
							</a>
							<a v-else target="_blank" rel="noopener noreferrer" v-bind:href="url">
								0x{{ author }}
							</a>
						</div>
					</div>
				</div>
				<!-- Post content: title, body, and avatars -->
				<div class="p-2.5">
					<!-- Title -->
					<h5 class="text-lg md:text-xl font-medium">
							{{ title }}
					</h5>
					<!-- Body -->
					<div v-if="content" class="relative overflow-visible" >
						<div class="text-gray-900 dark:text-gray-200 break-words" v-html="content"></div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import components
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters } from "vuex";
import ItemActions from "@/components/item/ItemActions.vue";
const EmbedLink = defineAsyncComponent(() => import('@/components/embeds/Link.vue'));
//import date-fns
import { isValid, formatDistanceToNowStrict } from '../../../node_modules/date-fns'

console.log("test");

export default {
	name: "ItemListing",
	props: {
		//item: Object
		//id: String
		title: String,
		content: String,
		author: String,
	},
	data() {
			return {
				url: "http://testnet.bscscan.com/address/0x" + this.author
			};
		},
	components: {
		ItemActions,
		EmbedLink
	},
	watch: {
	},
	computed: {
	},
	methods: {
	},
};
</script>

<style scoped>
.mask-overlay {
	-webkit-mask-image: linear-gradient(180deg,#000 65%,transparent);
	mask-image: linear-gradient(180deg,#000 65%,transparent);
}
</style>