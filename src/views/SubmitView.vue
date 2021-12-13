<template>
	<div class="w-full overflow-y-auto">
		<div class="grid grid-cols-12 xl:grid-cols-10">
			<div class="col-span-full xl:col-start-3 xl:col-end-9 flex flex-col gap-4 sm:p-6 my-2.5 sm:my-0">
				<h1 class="h3 font-semibold mb-0">
					Create post
				</h1>
				<div class="flex gap-6">
					<!-- Main Content Section -->
					<div class="w-full">
						<div class="flex flex-grow">
							<div class="w-full bg-white dark:bg-gray-800 sm:rounded-sm sm:border">
								<div class="p-2.5 space-y-2.5 sm:p-4 sm:space-y-3">
									<div class="relative">
										<input type="text" class="form-input light" v-model="submission.title" placeholder="Give your post a title"/>
										<div v-if="submission.title" class="absolute text-xs font-semibold text-gray-400 right-3 bottom-2" :class="{'text-red-500':submission.title.length >= 32}">
											{{32 - submission.title.length}}
										</div>
									</div>

									<Editor @input="getEditorContent" min-height="10rem" :limit="10000"/>
									

								</div>
								<div class="flex justify-end p-4 border-t">
									<button type="button" class="button linkGray400" @click="cancelPost()">
										Cancel Post
									</button>
									<button type="button" class="button purple500" @click="createPost()">
										{{ buttonText }}
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- End Main Content Section -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import Editor from "@/components/editors/Editor_V2.vue";
	import CreatePostOptions from "@/components/dropdowns/CreatePostOptions.vue";
	const LinkPreview = () => import('@/components/embeds/Link.vue')
	import Toggle from '@/components/Toggle.vue';

	export default {
		components: {
			CreatePostOptions,
			Editor,
			LinkPreview,
			Toggle
		},
		data() {
			return {
				time: 'immediately',
				options: [],
				embed: null,
				poll: false,
				pin: false,
				rating: null,
				yank: false,
				search: '',
				name: '',
				response: {},
				loadingPreview: false,
				showLinkInput: false,
				notifications: true,
				link: false,
				selected: null,
				lodges: [
				{ value: null, text: "#All" },
				{ value: "1", text: "#Memes" },
				{ value: "2", text: "#Misc" },
				],
				ratings: ['All ages','NSFW','NSFL']
				// submission: {
				//   title: null,
				//   link: null,
				//   image: {
				//     file: null,
				//     source: null,
				//     filename: null
				//   },
				//   body: null,
				//   guild: null,
				//   NSFW: false,
				// }
			};
		},
		computed: {
			...mapState("persist", ["v"]),
			submission() {
				return this.$store.state.create.post.submission
			},
			buttonText() {
				return 'Post'
			}
		},
		methods: {
			...mapActions("create", ['submitPost', 'resetSubmission']),
			cancelPost(){
				this.$router.push("/");
			},
			createPost() {
				//this.$store.commit('create/SET_SUBMISSION', {submission: this.submission})
				//this.submitPost()
				if((this.submission.title !== '' && this.submission.title !== null) && (this.submission.body != "<p></p>" && this.submission.body != null)){
					const signedContract = this.$store.getters['blockchainItems/getContract'];
					signedContract._createNewPost(this.submission.title, this.submission.body);
					this.$router.push("/");
					this.$store.dispatch('toasts/addNotification', {
						type: 'success',
						header: 'Post transaction pending!',
						message: 'Please check Metamask to see the progress of your transaction. You will get a notification from Metamask when your post is mined.'
					})
				}else{
					this.$store.dispatch('toasts/addNotification', {
						type: 'error',
						header: 'Post requirements not met.',
						message: 'You need to have at least 1 word in the title and the body of your post.'
					})
				}
			},
			setTime(time) {
				console.log('setTime method triggered')
				this.time = time;
			},
			setOptions(options) {
				console.log('setOptions method triggered')
				this.options = options
			},
			getEditorContent(value) {
				console.log("editor")
				console.log(value)
				this.submission.body = value;
			},
			onLinkInput: function(e){
				this.submission.link = e.target.innerHTML
			},
			chooseLink() {
				this.showLinkInput = true
				this.$nextTick(function(){
					this.$refs.linkInput.focus();
				});
			},
			removeLink() {
				this.showLinkInput = false;
				this.submission.link = null
			},
			chooseImage () {
				this.$refs.fileInput.value = null;
				this.$refs.fileInput.click()
			},
			removeImage() {
				if (this.submission.image) {
					this.submission.image = {};
				}
			},
			onSelectFile () {
				const input = this.$refs.fileInput
				let files = input.files
				if (files.length === 1) {
					let file = files[0]
					if (file.type.indexOf('image/') >= 0) {
						let reader = new FileReader
						reader.onload = e => {
							this.submission.image.source = e.target.result
						}
						this.submission.image.file = file
						this.submission.image.name = file.name
						reader.readAsDataURL(file)
						this.$emit('input', file)
					}
				}
				this.showLinkInput = false
			}
		},
		beforeUnmount() {
			this.resetSubmission()
		}
	};
</script>