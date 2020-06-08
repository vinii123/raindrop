import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: "AIzaSyBrIysPFBjjHrQLILnq2-uFSaLzqjnedk8",
  authDomain: "authentication-b221d.firebaseapp.com",
  databaseURL: "https://authentication-b221d.firebaseio.com",
  projectId: "authentication-b221d",
  storageBucket: "authentication-b221d.appspot.com",
  messagingSenderId: "104171805448",
  appId: "1:104171805448:web:2383ff26d08e86b6faeabd",
  measurementId: "G-2QTMW59BNT",
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    return quote.get('quote')
  }
}

export default new Firebase()