//importando bibliotecas.
import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import generateToken from "@mcorange9/generate-token";
import User from "./schemas/User.js";
const app = express();
const gen = new generateToken();
class App {
    run() {
        try {
            mongoose.connect(process.env.DBURL,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                    autoIndex: true,
                }
            );
            console.log("---- CONECTADO AO BANCO DE DADOS. ----")
        } catch {
            console.log("---- ERRO AO CONECTAR AO BANCO DE DADOS ----")
        }

        app.post("/api/cadastro", (req, res) => {
            const pssw = req.body.pssw;
            const email = req.body.email;

            //verifica se o email já foi usado.
            User.exists({ userEmail: email }).then(exists => {
                if (exists) {
                    return res.json({ status: '400', feedback: 'Este email já está sendo utilizado.' })
                } else {
                    try {
                        const psswhash = crypto.createHash('md5').update(pssw).digest('hex');
                        token = gen.generateToken(15);
                        var createUser = new User({
                            token: token,
                            userEmail: email,
                            userPassword: psswhash,
                        })
                        createUser.save().then(() => {
                            res.status("200");
                            return res.json({ status: '200', feedback: "Usuário cadastrado com sucesso!", token: token, hashpssw: psswhash });
                        });
                    } catch (error) {
                        res.status("500");
                        return res.json({ status: '500', feedback: "Erro interno", error: error });
                    }

                }
            })
        });

        app.post("/api/login", async (req, res) => {
            const pssw = req.body.pssw;
            const email = req.body.email;
            const dbuser = await User.findOne({userEmail: email});
            //verifica se o email existe.
            User.exists({ userEmail: email }).then(exists => {
                if (exists) {
                    try {
                        const psswhash = crypto.createHash('md5').update(pssw).digest('hex');
                        const token = dbuser.token;
                        if(psswhash == dbuser.userPassword) {
                            res.status("200");
                            return res.json({ status: '200', feedback: "Usuário validado com sucesso!", token: token });
                        } else {
                            res.status("400");
                            return res.json({ status: '400', feedback: "Senha errada!" }); 
                        }
                    } catch (error) {
                        res.status("500");
                        return res.json({ status: '500', feedback: "Erro interno", error: error });
                    }
                } else {
                    res.status("400");
                    return res.json({ status: '400', feedback: "Usuário não cadastrado!" }); 
                }
            })
        });

        app.listen("8080", () => {
            console.log("Servidor Ligado.");
        });
        return this;
    }
}
export default App;