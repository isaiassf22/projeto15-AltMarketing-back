import { db } from "../connection/mongo.js";
import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";


export async function signUp(req, res) {

    try {
      const existsUser = await db
        .collection("users")
        .find({ name: req.body.name })
        .toArray();
      if (existsUser.length !== 0) {
        console.log("Usuário já existe");
        res.sendStatus(409);
        return;
      }
  
      const password = bcrypt.hashSync(req.body.password, 10);
      await db.collection("users").insertOne({
        name: req.body.name,
        email: req.body.email,
        password: password,
        confirmpassword:password,
      });
      res.sendStatus(201);
    } catch (erro) {
      console.log(erro);
      return res.sendStatus(500);
    }
  }

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const existsUser = await db.collection("users").findOne({ email });
    console.log(existsUser)
    if (!existsUser) {
      return res.status(401).send('Usuário ou senha incorretos');
    }
    const passwordCorrect = bcrypt.compareSync(password, existsUser.password);

    if (!passwordCorrect) {
      return res.status(401).send('Usuário ou senha incorretos');
    }
    const token = tokenGenerator();
    await db
      .collection("sessions")
      .insertOne({ token, user: existsUser._id });

    res.send({ token , user: existsUser.name });
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
