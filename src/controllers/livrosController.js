import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosFind = await livros.find()
                                     .populate('autor')
                                     .populate('editora')
                                     .exec();
  
      res.status(200).json(livrosFind)    
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON())
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
    }
  }

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body})

      res.status(200).send({message: 'Livro foi atualizado com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id)
                                          .populate('autor', 'nome')
                                          .populate('editora')
                                          .exec();

      res.status(200).send(livroEncontrado)

    } catch (err) {
      res.status(400).send({message: `${err.message} - Id do livro não localizado.`})
    }
  }

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      
      await livros.findByIdAndDelete(id);

      res.status(200).send({message: 'Livro removido com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      const livrosEncontrados = await livros.find({'editora': editora}, {}).populate('editora').exec();

      res.status(200).send(livrosEncontrados)
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }
}

export default LivroController;