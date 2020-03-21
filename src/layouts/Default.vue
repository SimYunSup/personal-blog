<template>
  <div id="app">

    <header class="header">
      <div class="header__left">
        <Logo/>
      </div>

      <nav>
        <g-link
          v-for="nav in navList"
          :to="nav.link"
          :key="nav.name">
          {{ nav.name }}
        </g-link>
      </nav>
      
      <div class="header__right">        
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot/>
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }} Pickhealer. </span>
      <span class="footer__links">Powered by <a href="//gridsome.org"> Gridsome </a></span>
    </footer>

  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ToggleTheme from '~/components/ToggleTheme.vue'

export default {
  props: {
    showLogo: { default: true }
  },
  data () {
    return {
      navList: [
        {name: 'Blog', link: '/'},
        {name: 'About'}
      ]
    }
  },
  components: {
    Logo,
    ToggleTheme
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  margin-bottom: var(--header-bottom);
  top:0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  nav {
    position: absolute;
    width: 30%;
    left: 35%;
    display: flex;
    justify-content: space-around;
  }

  nav a {
    display: block;
    text-decoration: none;
    color: currentColor;
    transition: transform .3s;

    &:hover {
      transform: translateY(5px);
    }
  }

  @media screen and (min-width: 1300px) {
    width: 100%;
  }

  @media screen and (max-width: 650px) {
    nav {
      top: 60px;
      left: 15%;
      width: 70%;
    }
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: .8em;

  > span {
    margin: 0 .35em;
  }

  a {
    color: currentColor;
  }
}
</style>
