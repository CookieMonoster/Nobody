<template>
	<div>
		<!-- Skeleton loading -->
		<div v-if="!items.length">
			<div v-if="isCard && !compact">
				<div v-for="i in 4" :key="i" class="flex mb-4 last:mb-0">
					<div class="hidden md:block mr-4 animate-pulse">
						<div class="bg-gray-200 dark:bg-white dark:bg-opacity-20 sm:rounded-sm w-16 h-16"></div>
					</div>
					<div class="w-full p-2.5 sm:p-4 sm:rounded-sm sm:border bg-white dark:bg-gray-800 dark:border-transparent">
						<div class="flex flex-col animate-pulse">
							<div class="hidden sm:flex flex-col w-full justify-between mb-6">
								<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-2 w-40 h-3 rounded-sm"></div>
								<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-0 w-32 h-3 rounded-sm"></div>
							</div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-3 w-3/4 h-3 rounded-sm"></div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 mb-4 w-32 h-3 rounded-sm"></div>
							<div class="bg-gray-200 dark:bg-white dark:bg-opacity-10 w-full h-20 sm:h-24 rounded-sm"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Posts -->
		<div v-if="items.length">
			<keep-alive v-for="item in items.slice().reverse()">
				<component :is="itemComponent" :title="item[0]" :content="item[1]" :author="item[2]" class="mb-2.5 sm:mb-2 last:mb-0"/>
			</keep-alive>
		</div>

		<!-- Loading Button -->
		<!--
		<div v-show="items.length" class="flex w-full justify-center mt-4 px-4 sm:px-8">
			<button class="button gray200" @click="loadMore()">
				<span :class="{'animate-pulse':loading}">
					{{ loading ? 'Loading...' : 'Load more posts' }}
				</span>
			</button>
		</div>
		-->

		<!-- <virtual-list
		v-if="items.length"
		:data-key="'items'"
		:data-sources="items"
		:data-component="itemComponent"
		:keeps="25"
		:estimate-size="162"
		:page-mode="true"
		:item-class="'mb-2.5 sm:mb-2 last:mb-0'"
		:wrap-style="{ padding: '0px' }"
		>
		<div slot="footer" class="flex w-full justify-center mt-4 px-4 sm:px-8">
			<t-button variant="gray200" @click="loadMore()">
				Load more posts
			</t-button>
		</div>
	</virtual-list> -->

</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue'
	import { mapState } from "vuex";
	const ItemListing = defineAsyncComponent(() => import('@/components/item/ItemListing.vue'))
	//import ItemListingCompact from "@/components/item/ItemListingCompact.vue";
	export default {
		name: "blockchainItems",
		props: {
			ids: Array,
			moderating: Boolean,
			loading: Boolean
		},
		data() {
			return {
				page: this.$route.query.page || 1
			};
		},
		components: {
			ItemListing
		},
		computed: {
			...mapState("persist", ["isCard"]),
			items() {
				return this.$store.getters['blockchainItems/getAllPosts'];
			},
			itemComponent() {
				return ItemListing;
			}
		},
		methods: {
			loadMore() {
				this.$emit('paginate')
			}
		},
		mounted() {
			console.log('ItemList.vue:' + this.items)
		}
	};
</script>