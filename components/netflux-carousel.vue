<template>
    <div>
        <section v-swiper:carousel="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" 
                  v-for="(movie, index) in renderMovies" :key="index" 
                  :data-hash="index"
                  @click="watchMovie($event.target.dataset.hash)" 
                  v-lazy-container="{ selector: 'img', }">

                <img :data-src="movie.images[0].url" 
                      class="banner" 
                      alt="movie poster" 
                      data-loading="/ld.gif" >
                <h1 class="title" >{{ movie.title }}</h1>
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
    watchMovie(pos){
      this.storeIndex(pos)
      this.findMovieSelected()
      this.addHistory()

      // Recovery in  /watch
      this.$ls.set('movieSelected', JSON.stringify(this.targetMovie)) 

      //save history on localStorage and recovery on /history
      this.$ls.set('history', JSON.stringify(this.history))

     // go to video page
     this.$router.push('/watch')
    },

    findMovieSelected () {      
      this.targetMovie = this.movies.slice(this.indexTouch,  this.indexTouch + 1)[0]
    },

    addHistory(){

      let finded = this.history.some((el, ind) => {
        return el.id === this.targetMovie.id
      })

      if(!finded) this.history.push(this.targetMovie)
      
    },

    imgReady(){
      this.imgLoaded = false
    },

    storeIndex(pos){
      this.indexTouch = pos;    
    }
  },

	beforeCreate () {
    let moviesRecoveried = JSON.parse(this.$ls.get('movies'))

    if( moviesRecoveried !== undefined){

      this.$http.get('http://localhost:3002/api/movies').then((res) => {
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
    height: 80vh;
    list-style: none;
    position: relative;
      & > .banner{
        border-radius: $b-radius;
        max-width: 100%;
        min-height: 80vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
      & > .title{
        color: #fff!important;
        margin: 10px 0 0 10px;
        text-align: left;
        text-transform: uppercase;
      }
      &.swiper-slide-active {
      border: 3px solid $custom-primary-color;
      border-radius: $b-radius;
      overflow: hidden;
    }
	}
</style>