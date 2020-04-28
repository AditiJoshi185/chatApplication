import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () =>
        firebase.initializeApp({
            apiKey: "AIzaSyBK4IOSFLRcM7L2h40b4URu8bUDoScDh2A",
            authDomain: "chat-app-4bdea.firebaseapp.com",
            databaseURL: "https://chat-app-4bdea.firebaseio.com",
            projectId: "chat-app-4bdea",
            storageBucket: "chat-app-4bdea.appspot.com",
            messagingSenderId: "26352786963",
            appId: "1:26352786963:web:d88bf3d10b7fb8e94b69e6",
            measurementId: "G-M7ETRHWRJ5"
        });


    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            };
            this.db.push(message);
        }
    };



    get db() {
        return firebase.database().ref('messages');
    }

    parse = message => {
        const { timestamp, text, user } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);
        return {
            _id,
            createdAt,
            text,
            user,
        };
    }


    get = callback => {
        this.db
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }


    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

}

export default new Fire();
