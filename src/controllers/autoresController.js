import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresFind = await autores.find();
  
      res.status(200).json(autoresFind)    
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON())
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
    }
  }

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, {$set: req.body})

      res.status(200).send({message: 'Autor foi atualizado com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findById(id)

      res.status(200).send(autorEncontrado)

    } catch (err) {
      res.status(400).send({message: `${err.message} - Id do autor não localizado.`})
    }
  }

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      
      await autores.findByIdAndDelete(id);

      res.status(200).send({message: 'Autor removido com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }
}

export default AutorController;