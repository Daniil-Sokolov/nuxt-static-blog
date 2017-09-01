export default function({ store, redirect }) {
  if (!store.state.token) {
    return redirect('/login')
  } else {
    return store.dispatch('verifyToken', { token: store.state.token })
      .then(valid => {
        console.log('auth middleware token valid:', valid)
        if (!valid) redirect('/login')
      })
  }
}
