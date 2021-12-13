<template>
	<nav class="fixed w-full bg-white sm:border-b dark:bg-gray-800 dark:border-gray-700 dark:border-opacity-70 z-100">
		<div class="mx-auto px-4 md:px-6">
			<div class="flex items-center justify-between h-12 sm:h-14">
				<div class="flex flex-grow items-center">
					<div class="flex-shrink-0">
						<router-link to="/" class="font-semibold text-xl text-gray-900">
							{{ site.name }}
						</router-link>
					</div>
					<div class="hidden md:block w-1/3">
						<div class="ml-4 flex items-baseline space-x-4">
							<div class="relative">
								<div class="text-lg font-semibold dark:text-gray-200">
									Nobody Decentralized Community
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="hidden md:flex space-x-2">
					<div v-if="ifFeedView">
						<button v-if="isConnected == true" class="button primary" @click="connectAccount" ref="btnToggle">
								Refresh Feed
						</button>
						<button v-else class="button primary" @click="connectAccount" ref="btnToggle">
								Connect Account
						</button>
					</div>
				</div>
				<div class="-mr-1 flex space-x-1 md:hidden">
					<!-- Search button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="searchDrawer">
						<span class="sr-only">Search</span>
						<!-- Menu Icon -->
						<i class="far fa-search fa-fw fa-lg"></i>
					</button>
					<!-- Mobile menu button -->
					<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
						<span class="sr-only">Open main menu</span>
						<!-- Menu Icon -->
						<i class="far fa-bars fa-fw fa-lg"></i>
					</button>
				</div>
				<!-- Mobile Menu -->
				<transition enter-class="opacity-0" enter-active-class="ease-out transition-all duration-100" enter-to-class="opacity-200" leave-class="opacity-100" leave-active-class="ease-out transition-all duration-200" leave-to-class="opacity-0">
					<div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
						<div @click="isOpen = false" class="absolute inset-0 bg-gray-900 opacity-80" tabindex="0"></div>
					</div>
				</transition>
				<aside class="transform top-0 right-0 w-5/6 bg-white dark:bg-gray-800 fixed h-full py-3 overflow-y-auto ease-in-out transition-all duration-200 z-75" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
					<div class="absolute top-4 left-3">
						<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="drawer">
							<span class="sr-only">Close menu</span>
							<!-- Menu Icon -->
							<i class="far fa-long-arrow-left fa-fw fa-lg"></i>
						</button>
					</div>
					<div class="flex flex-col items-center mt-8 px-4 py-2">
						<router-link to="/login" custom v-slot="{ navigate }">
							<button class="button outlinePrimary w-full" @click="navigate" @keypress.enter="navigate" role="link">
								Sign in
							</button>
						</router-link>
						<router-link to="/register" custom v-slot="{ navigate }">
							<button class="button primary mt-2 w-full" @click="navigate" @keypress.enter="navigate" role="link">
								Sign up
							</button>
						</router-link>
					</div>
					<router-link to="/following" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-info-circle text-center fa-fw mr-3"></i><span>About</span>
					</router-link>
					<router-link to="/guilds" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="far fa-scroll-old text-center fa-fw mr-3"></i><span>Rules</span>
					</router-link>
					<router-link to="/saved" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="fab fa-github text-center fa-fw mr-3"></i><span>Source Code</span>
					</router-link>
					<router-link to="/settings" class="block px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="isOpen = false">
						<i class="fab fa-discord text-center fa-fw mr-3"></i><span>Discord</span>
					</router-link>
					<button class="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-200" @click="dark = !dark">
						<i class="far text-center fa-fw mr-3" :class="dark ? 'fa-sunglasses' : 'fa-moon'"></i>
						<span>{{ dark ? 'Light Theme' : 'Dark Theme'}}</span>
					</button>
				</aside>

				<!-- Search Menu -->
				<transition enter-class="opacity-0" enter-active-class="ease-out transition-all duration-100" enter-to-class="opacity-200" leave-class="opacity-100" leave-active-class="ease-out transition-all duration-200" leave-to-class="opacity-0">
					<div @keydown.esc="isSearch = false" v-show="isSearch" class="z-10 fixed inset-0 transition-opacity">
						<div @click="isSearch = false" class="absolute inset-0 bg-gray-900 opacity-80" tabindex="0"></div>
					</div>
				</transition>
				<aside class="transform top-0 right-0 w-full bg-white dark:bg-gray-800 fixed h-full p-3 overflow-y-auto ease-in-out transition-all duration-200 z-75" :class="isSearch ? 'translate-x-0' : 'translate-x-full'">
					<div class="flex items-center space-x-3">
						<button class="inline-flex items-center justify-center p-1 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" @click="searchDrawer">
							<span class="sr-only">Close search menu</span>
							<!-- Menu Icon -->
							<i class="far fa-long-arrow-left fa-fw fa-lg"></i>
						</button>
						<input class="form-input light" v-model="searchTerm" placeholder="Search Ruqqus..." @keyup.enter="search(); searchDrawer()"/>
					</div>
				</aside>
			</div>
		</div>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { ethers } from "ethers";

	import Search from "@/components/popovers/PopoverSearch.vue";
	const isMetaMaskInstalled = () => {

    	//Have to check the ethereum binding on the window object to see if it's installed
    	const { ethereum } = window;
    	return Boolean(ethereum && ethereum.isMetaMask);
	};
	export default {
		name: "Navbar",
		components: {
			Search
		},
		data() {
			return {
				isConnected: false,
				searchTerm: this.$route.query.q,
				isOpen: false,
				isSearch: false
			};
		},
		computed: {
			...mapState("persist", ["v"]),
			site() {
				return this.$store.getters['site/getSite'];
			},
			ifFeedView(){
				return this.$route.name == "HotView";
			}
		},
		watch: {
			isOpen: {
				immediate: true,
				handler(isOpen) {
					if (isOpen) document.body.style.setProperty("overflow", "hidden");
					else document.body.style.removeProperty("overflow");
				}
			},
			isSearch: {
				immediate: true,
				handler(isSearch) {
					if (isSearch) document.body.style.setProperty("overflow", "hidden");
					else document.body.style.removeProperty("overflow");
				}
			}
		},
		methods: {
			...mapActions("persist", ["logout"]),
			connectAccount: async function(){
				

				if(isMetaMaskInstalled()){
					try {
				        // check if the chain to connect to is installed
				        await window.ethereum.request({
				          method: 'wallet_switchEthereumChain',
				          params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
				        });
						
				    } catch (error) {
				        // This error code indicates that the chain has not been added to MetaMask
				        // if it is not, then install it into the user MetaMask
				        if (error.code === 4902) {
				          try {
				            await window.ethereum.request({
				              method: 'wallet_addEthereumChain',
				              params: [
				                {
									chainId: '0x61',
									chainName: "Smart Chain - Testnet",
				                  	nativeCurrency: {
  									  name: "Binance Coin",
  									  symbol: "BNB",
  									  decimals: 18
  									},
				                  	rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
									blockExplorerUrls: ['https://testnet.bscscan.com']
				                }
				              ],
				            });
				          } catch (addError) {
							console.log("add error")
				            console.error(addError);
							return;
				          }
				        }
				      }
					console.log(this.$route.name);
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const provider = new ethers.providers.Web3Provider(window.ethereum)
					const signer = provider.getSigner()

					const contractAddress = '0x7b67C9c5d8BaF5D702CFaeA88f97dDd613358743';
					const contractAbi = [
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"indexed": false,
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"indexed": false,
								"internalType": "string",
								"name": "author",
								"type": "string"
							}
						],
						"name": "NewPost",
						"type": "event"
					},
					{
						"inputs": [
							{
								"internalType": "string",
								"name": "_title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "_content",
								"type": "string"
							}
						],
						"name": "_createNewPost",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "_user",
								"type": "address"
							}
						],
						"name": "_getPostsByUser",
						"outputs": [
							{
								"internalType": "uint256[]",
								"name": "",
								"type": "uint256[]"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "_index",
								"type": "uint256"
							}
						],
						"name": "getPost",
						"outputs": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "title",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "content",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "author",
										"type": "string"
									}
								],
								"internalType": "struct PostStorage.Post",
								"name": "",
								"type": "tuple"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "getPosts",
						"outputs": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "title",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "content",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "author",
										"type": "string"
									}
								],
								"internalType": "struct PostStorage.Post[]",
								"name": "",
								"type": "tuple[]"
							}
						],
						"stateMutability": "view",
						"type": "function"
					}
					]

						const nobodyContract = new ethers.Contract(contractAddress, contractAbi, provider);
						const nobodyContractSigned = nobodyContract.connect(signer)
						this.$store.commit('blockchainItems/setContract', nobodyContractSigned);



						const postsArray = await nobodyContract.getPosts();

						console.log(postsArray);

						this.$store.commit('blockchainItems/setPosts', postsArray);
						this.isConnected = true;

						this.$store.dispatch('toasts/addNotification', {
								type: 'success',
								header: 'Feed refreshed!',
								message: 'Metamask has been installed correctly and the feed has been refreshed.'})
				}else {
				     this.$store.dispatch('toasts/addNotification', {
							type: 'error',
							header: 'Metamask not detected.',
							message: 'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
					})
					return;
				} 
			},
			search() {
				this.$router.push("/search?q="+this.searchTerm);
			},
			drawer() {
				this.isOpen = !this.isOpen;
			},
			searchDrawer() {
				this.isSearch = !this.isSearch;
			}
			
		},
		mounted() {
			document.addEventListener("keydown", e => {
				if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
				if (e.keyCode == 27 && this.isSearch) this.isSearch = false;
			});
			window.addEventListener('popstate', () => {
				if (this.isOpen) this.isOpen = false, this.$router.go(1);
				if (this.isSearch) this.isSearch = false, this.$router.go(1);
			})
		},
		created() {
		this.connectAccount();
		//this.getFeed()
		//document.documentElement.style.setProperty('--color-primary', `139, 92, 246`)
		}
	};
</script>
