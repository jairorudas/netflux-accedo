<template>
    <div>
        <section v-swiper:first="swiperOption">
        <div class="swiper-wrapper"  >
            <div class="swiper-slide" v-for="(movie, index) in renderMovies" :key="index" :data-hash="index" >
            	<img :src="movie.images[0].url" class="banner " >
              
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
            slidesPerView: 5,
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
			movies: []
    };
	},
	computed:{
		renderMovies: function (){
        return this.movies
		}
  },

	created: function () {
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
      
      this.movies = parserResponse;
       //console.log(this.movies)
       
     }).catch(err => console.log(err))
    
	}
	
};
</script>

<style scoped lang="scss">
	@import '../assets/scss/variables.scss';
	.swiper-slide {
    height: 80vh;
      & > .banner{
        border-radius: $b-radius;
        max-width: 100%;
        min-height: 80vh;
      }
      &.swiper-slide-active {
      border: 3px solid $custom-primary-color;
      border-radius: $b-radius;
      overflow: hidden;
    }
	}
</style>