// ===================================================================
//   CÓDIGO FINAL E PRONTO PARA O ARQUIVO script.js
//   Sua chave mestra já está configurada abaixo.
// ===================================================================

const firebaseConfig = {
  apiKey: "AIzaSyCK-0OGHC4oGurZpk1H3kPmDWDy2VYX6Aw",
  authDomain: "chess-puzzle-blitz-c9efb.firebaseapp.com",
  projectId: "chess-puzzle-blitz-c9efb",
  storageBucket: "chess-puzzle-blitz-c9efb.firebasestorage.app",
  messagingSenderId: "714442647973",
  appId: "1:714442647973:web:8469a20054e6000c4ee04c",
  measurementId: "G-WMMG18VE6E"
};

// ===================================================================
//   DAQUI PARA BAIXO, O CÓDIGO FAZ A MÁGICA ACONTECER
// ===================================================================

// Inicializa a conexão com o Firebase usando a chave
firebase.initializeApp(firebaseConfig);

// Pega uma referência ao nosso banco de dados "Firestore"
const db = firebase.firestore();

// Busca a informação na "gaveta" de teste que criamos
db.collection("teste").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Pega a mensagem de dentro do documento
        const mensagem = doc.data().mensagem;

        // Encontra o parágrafo no HTML e coloca a mensagem lá dentro
        document.getElementById("mensagem-firebase").innerText = mensagem;
    });
}).catch((error) => {
    console.error("Deu erro ao buscar os dados: ", error);
    document.getElementById("mensagem-firebase").innerText = "Erro ao conectar com o Firebase.";
});
