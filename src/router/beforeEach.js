import store from '../mainVuex';

const isAuthRoute = route => {
  return route.path === '/auth'
}

const isLogged = () => {
  if (!store.getters.isLogged) {
    store.dispatch('refreshAuthUser')
  }
  return store.getters.isLogged
}

export default(to, from, next) => {

  window.scrollTo(0, 0);

  if (!isLogged() && !isAuthRoute(to)) {
    next('/auth')
  } else if (isLogged() && isAuthRoute(to)) {
    next('/')
  } else {

    let role = to.meta.role

    if (!role) {
      next()
    } else {

      store.dispatch('userHasRole', role)
        .then(response => {
          if (response) {
            next();
          } else {
            next('/');
          }
        })
    }
  }
}
