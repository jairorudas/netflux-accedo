<template>
    <div>
        <section v-swiper:carousel="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" 
                  v-for="(movie, index) in renderMovies" :key="index" 
                  :data-hash="index"
                  @click="watchMovie()" 
                  v-lazy-container="{ selector: 'img', }">

                  <v-card :style="{overflow: 'hidden'}">
                    <img :data-src="movie.images[0].url" 
                      class="banner" 
                      alt="movie poster" 
                      data-loading="/ld.gif"
                      data-error="/error-500.jpg">

                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{ movie.title }}</h3>
                        <div class="desciption"> {{ movie.description }}</div>
                      </div>
                    </v-card-title>

                    <v-card-actions>
                      <v-btn flat color="orange" to="/watch-video" >watch</v-btn>
                    </v-card-actions>
                  </v-card>
            </div>
        </div>
        <span class="swiper-button-next" tabindex="1"></span>
        <span class="swiper-button-prev" tabindex="2"></span>
        </section>
    </div>
</template>

<script>
export default {
   data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesPerView: 4,
        spaceBetween: 30, 
        initialSlide: 3,
        grabCursor: true,        
        observer: true,
        mousewheel: {
          invert: true
        },
        hasNavigation: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false
        },
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },

          // when window width is <= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        },
        on: {
          slideChange() {
            console.log("onSlideChangeEnd", this.realIndex);
          },
          tap() {
            console.log("onTap", this);
          },
          realIndex(e) {
            console.log(this, "INDEX");
          }
        }
			},
      movies: [],
      targetMovie: [],
      history: [],
      indexTouch: 0,
      imgLoaded: true
    };
	},
	computed:{
		renderMovies: function (){
        return this.movies
		}
  },

  methods: {
    watchMovie(){
      let pos = this.carousel.realIndex;
      this.storeIndex(pos)
      this.findMovieSelected()
      this.addHistory()

      this.$ls.set('movieSelected', JSON.stringify(this.targetMovie)) 

    },

    findMovieSelected () {    
      this.targetMovie = this.movies.slice(this.indexTouch,  this.indexTouch + 1)[0]
    },

    addHistory(){
      let finded = this.history.some((el, ind) => {
        return el.id === this.targetMovie.id
      })

      if(!finded) {
        this.history.unshift(this.targetMovie);
        this.$ls.set('history', JSON.stringify(this.history))
      }
      
     this.$router.push('/watch-video')
      
    },

    storeIndex(pos){
      this.indexTouch = pos;    
    }
  },

  created(){
    let lsHistory = JSON.parse(this.$ls.get('history')) 
    Boolean(lsHistory) ?  this.history = lsHistory : false;
  },

	beforeCreate () {
    let moviesRecoveried = JSON.parse(this.$ls.get('movies'))

    if( moviesRecoveried !== undefined) {
      const headers = {"Content-Type": "application/json"}
      this.$http.get('https://8pg0wyviq4.execute-api.us-east-1.amazonaws.com/dev/movies', headers).then((res) => {
        let response = res.body.message.entries;
        let responseWithOutImages = []
 
        let parserResponse = response.map((el, ind) => {
           if(el.images[0].url === "") {
            responseWithOutImages.push(ind)
           } 
           el.images[0].url = el.images[0].url.replace('200', '500') 
           return el
        })
 
       responseWithOutImages.forEach((el) => {
         parserResponse.splice(el, 1)
       })
       
       this.$ls.set('movies', JSON.stringify(parserResponse))
 
       this.movies = parserResponse;
        
      }).catch(err => console.log(err))

    } else {
      this.movies = moviesRecoveried
    }
    
  },
  mounted: function () {
    document.addEventListener('keyup', (event) => {
      if(event.keyCode === 13 ) this.watchMovie(this.carousel.realIndex)
    })
  }
	
};
</script>

<style scoped lang="scss">
	@import '../assets/scss/variables.scss';
	.swiper-slide {
    //height: 80vh;
    list-style: none;
    position: relative;
      & .banner{
        max-width: 100%;
        margin: 0 auto;
        min-height: 297px;
      }
      
      &.swiper-slide-active {
      border: 3px solid $custom-primary-color;
      border-radius: $b-radius;
      overflow: hidden;
    }
   .desciption{
     height: 100px;
     overflow: hidden;
   } 
	}
</style>