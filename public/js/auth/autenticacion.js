class Autenticacion {

  cambiarPassword(email){
    const configuration = {
      url: 'http://localhost:8080/public/'
    }

    firebase.auth().sendPasswordResetEmail(email,configuration)
      .then(()=>{
        Materialize.toast(`Se ha enviado un correo para restablecer la contraseña`, 5000)

      })
      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
      $('.modal').modal('close')

  }

  autEmailPass(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified) {
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
          Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
        } else {
          firebase.auth().signOut()
          Materialize.toast(`Por favor realiza la verificación de la cuenta`, 5000)
        }
        $('.modal').modal('close')
      })
  }

  crearCuentaEmailPass(email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayName: nombres
        })

        const configuration = {
          url: 'http://localhost:8080/public/'
        }

        result.user.sendEmailVerification(configuration).catch(error => {
          console.error(error)
          Materialize.toast(error.message, 400)
        })

        firebase.auth().signOut()
        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )

        $('.modal').modal('close')
      })
      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
  }

  authCuentaGoogle() {
    
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
        .then(result=> {
          $('#avatar').attr('src', result.user.photoURL)
          $('.modal').modal('close')
          Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
        })
        .catch(error=> {
          console.error(error)
          Materialize.toast(`Sucedio un error al autenticarse con google ${error} `, 4000)
        });

        
  }

  authCuentaFacebook() {

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result=> {
          $('#avatar').attr('src', result.user.photoURL)
          $('.modal').modal('close')
          Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
        })
        .catch(error=> {
          console.error(error)
          Materialize.toast(`Sucedio un error al autenticarse con facebook ${error} `, 4000)
        });    
    
  }

  authTwitter() {
    // TODO: Crear auth con twitter
  }
}
