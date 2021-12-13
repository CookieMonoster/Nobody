<template>
	<div class="w-full overflow-y-auto">
		<Banner v-if="site.hasBanner"/>
		<div class="container mx-auto grid grid-cols-12">
			<div class="col-span-full flex gap-6 sm:py-6 my-2.5 sm:my-0" :class="isCard ? 'lg:col-start-3 lg:col-end-11' : 'lg:col-start-2 lg:col-end-12'">

				<!-- Main Content Section -->
				<div class="w-full">

					<!-- Post Creation -->
					<router-link v-if="isConnected == true" to="/submit" class="group hidden sm:flex items-center mb-4 px-4 py-3 bg-white dark:bg-gray-800 sm:border sm:rounded-sm">

						<div class="flex-grow overflow-hidden">
							<div class="flex items-center h-full">
								<p class="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-200 mb-0">
									Create a new post...
								</p>
							</div>
						</div>
					</router-link>
					<!-- End Post Creation -->

					
					<!-- End Post Sorting and Display Toggle -->

					<!-- List of Posts -->
					<ItemList v-if="posts" :loading="loading" @paginate="paginated()"/>
					<!-- End List of Posts -->

					<!-- Home Feed Empty State -->
					<div v-if="$route.name === 'HomeView'" v-show="!posts" class="relative">
						<div v-if="isCard">
							<div v-for="i in 3" :key="i" class="flex mb-4 last:mb-0">
								<div class="mr-4">
									<div class="border-2 border-gray-300 border-dashed dark:bg-white dark:bg-opacity-20 rounded-sm w-16 h-16"></div>
								</div>
								<div class="w-full p-4 rounded-sm border-2 border-gray-300 border-dashed dark:bg-gray-800">
									<div v-if="i === 1" class="flex flex-col items-center p-20">
										<i class="block fal fa-home-lg-alt text-gray-300 text-5xl mb-3"></i>
										<div class="h4">
											Welcome to your Home Feed
										</div>
									</div>
									<div v-else class="p-40">
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div v-for="i in 4" :key="i" class="mb-2 last:mb-0 px-4 py-3 rounded-sm border-2 border-gray-300 border-dashed dark:bg-gray-800">
								<div v-if="i === 1" class="flex flex-col items-center p-4">
									<i class="block fal fa-home-lg-alt text-gray-300 text-5xl mb-3"></i>
									<div class="h4">
										Welcome to your Home Feed
									</div>
									<p class="text-gray-700">
										When you join some communities, their posts show up here!
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- End Home Feed Empty State -->

				</div>
				<!-- End Main Content Section -->
			</div>
		</div>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue'
// Import our components
const Banner = defineAsyncComponent(() => import('@/components/Banner.vue'))
const ItemList = defineAsyncComponent(() => import('@/views/ItemList.vue'))
const ItemSort = defineAsyncComponent(() => import('@/components/dropdowns/ItemSort.vue'))
const ListingToggle = defineAsyncComponent(() => import('@/components/forms/ListingToggle.vue'))



import { mapState } from "vuex";



export default {
	name: "FeedView",
	//props: ["users"],
	data() {
		return {
			loading: false,
			errored: false,
			items: [],
			params: {
				page: this.$route.query.page || 1,
				sort: this.$route.query.sort || 'hot',
				t: this.$route.query.t || 'all'
			}
		};
	},
	components: {
		Banner,
		ItemList,
		ItemSort,
		ListingToggle,
	},
	computed:{
		...mapState("persist", ["is_authenticated", "v", "isCard"]),
		...mapState("items", ["posts"]),
		isConnected(){
			return this.$store.getters['blockchainItems/getContract'] !== null;
		},
		site() {
			return this.$store.getters['site/getSite'];
		},
		feedIcon() {
			if (this.$route.name === 'HomeView') {
				return 'fa-home-lg-alt'
			} else if (this.$route.name === 'StargazedView') {
				return 'fa-stars'
			} else if (this.$route.name === 'TrendingView') {
				return 'fa-fire'
			} else {
				return 'fa-layer-group'
			}
		}
	},
	watch: {
		// call again the method if the route changes
		'$route': {
			handler() {
				this.loading = true;
				this.errored = false;
				//this.getFeed()
			},
			flush: "post"
		}
	},
	methods: {

		getFeed() {
			let payload = {
				feed: this.$route.meta.title,
				params: this.params
			}
			this.$store.dispatch('items/fetchFeed', payload)
			.then(() => {
				console.log("getFeed dispatch successful")
			})
			.catch(error => {
				console.error(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
		},
		paginated() {
			console.log(`pagination works! ${this.page++}`)
			this.$router.replace({query: {page: this.page++ }})
		}
	},
	created() {
		//this.connectAccount();
		//this.getFeed()
		//document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
	}
};
</script>
