const { response, json } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');



const login =  async (req, res = response) => {

    const { correo, password} = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario){
            return res.status(400).json({
                msg: "El correo no es valido - revisa la base de datos "
            })
        }

        // Verificar la contraseña
        const contraseña = await Usuario.findOne({ password });
        if(!contraseña){
            return res.status(400).json({
                msg: "La contraseña no es valida - revisa la base de datos "
            })
        }


        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }


}

module.exports = {
    login
}