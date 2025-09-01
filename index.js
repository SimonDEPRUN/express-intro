import 'dotenv/config'
import express, { json } from 'express'

const app = express();

app.get('/', (req, res) => {
    console.log("GET : /");
    res.end("GET : /");
});

// app.get(['/home', '/accueil'], (req, res) => {
//     console.log(`GET : ${req.url}`);
//     res.end(`GET : ${req.url}`);
// })
// app.post(['/home', '/accueil'], (req, res) => {
//     console.log(`POST : ${req.url}`);
//     res.end(`POST : ${req.url}`);
// })

app.route(['/home', '/accueil']) 
    .get((req, res) => {
        console.log(`GET : ${req.url}`);
        // res.end(`GET : ${req.url}`);
        res.sendFile(import.meta.dirname +'/index.html');
    })
    .post((req, res) => {
        console.log(`POST : ${req.url}`);
        // res.end(`POST : ${req.url}`);
        res.sendFile(import.meta.dirname +'/index.html');
    })

app.all("/personne", (req, res) => {
    console.log(`${req.method} : ${req.url}`);
    res.end(`${req.method} : ${req.url}`);
})


app.get('/adresse', (req, res) => {
    res.end(`Ici c'est ${req.query['ville']} - ${req.query.cp}`)
})
app.get('/adresse/:ville/:cp', (req, res) => {
    res.end(`Ici c'est ${req.params['ville']} - ${req.params.cp}`)
})

app.get('/calcul/:operateur', (req, res) => {
    let chivalide = (req.query.a == Number(req.query.a) && req.query.b == Number(req.query.b));
    if (`${req.params['operateur']}` == "plus" && chivalide) {
        var calcule = Number(req.query.a) + Number(req.query.b)
        res.end(`votre calcule est : ${req.query.a} + ${req.query.b} = ${calcule}`);
    } else if (`${req.params['operateur']}` == "moins" && chivalide) {
        var calcule = Number(req.query.a) - Number(req.query.b)
        res.end(`votre calcule est : ${req.query.a} - ${req.query.b} = ${calcule}`);
    } else if (`${req.params['operateur']}` == "mult" && chivalide) {
        var calcule = Number(req.query.a) * Number(req.query.b)
        res.end(`votre calcule est : ${req.query.a} x ${req.query.b} = ${calcule}`);
    } else if (`${req.params['operateur']}` == "div" && chivalide) {
        if (Number(req.query.b) !== 0) {
            var calcule = Number(req.query.a) / Number(req.query.b)
            res.end(`votre calcule est : ${req.query.a} / ${req.query.b} = ${calcule}`);
        } else {
            res.end(`votre calcule : ${req.query.a} / ${req.query.b} ne fonctionne pas. La division par zero n'est pas possible`);
        }
    } else {
        res.end("Vos valeurs et/ou votre operation ne sont pas valide ");
    }
})


// middleware pour les routes restantes : à placer en dernier
app.get('/*splat', (req, res) => {
    console.log(`GET : La route demandée (${req.url}) n'existe pas`);
    // res
    //     .status(404)
    //     .end(`GET : La route demandée (${req.url}) n'existe pas`);
    // ne peut pas personaliser le message d'erreur
    // res
    //     .sendStatus(404)
    res
        .status(404)
        .type("json")
        .json({
            "Erreur" : "La page demandée n'existe pas"
        })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Adresse server : http://localhost:${PORT}`);
})