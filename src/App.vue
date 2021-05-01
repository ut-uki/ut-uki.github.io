<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info" id="nav">
        <b-navbar-brand href="/">LunCider</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/" disabled>Login</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Does not work"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item-dropdown text="Page" right>
              <b-dropdown-item to="/lunch">Lunch</b-dropdown-item>
              <b-dropdown-item to="/play">Play</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <router-view/>
    <footer>
      <small>Copyright © 2021 ut-uki All Rights Reserved.</small>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px 20px;

  .navbar-brand {
    font-size: 30px;
  }

  a {
    font-size: 15px;
    color: #000;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

footer {
  background-color: #333333;
  color: white;
  padding: 20px;

  small {
    display: inline;
    text-align: right;
  }
}
</style>
