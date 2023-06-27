import editoras from "../models/Editora.js";

class EditoraController {

  static listareditoras = async (req, res) => {
    try {
      const editorasFind = await editoras.find();
  
      res.status(200).json(editorasFind)    
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static cadastrarEditora = async (req, res) => {
    try {
      let editora = new editoras(req.body);
      await editora.save();
      res.status(201).send(editora.toJSON())
    } catch (err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar editora.`})
    }
  }

  static atualizarEditora = async (req, res) => {
    try {
      const id = req.params.id;

      await editoras.findByIdAndUpdate(id, {$set: req.body})

      res.status(200).send({message: 'Editora foi atualizada com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }

  static listarEditoraPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const editoraEncontrada = await editoras.findById(id)

      res.status(200).send(editoraEncontrada)

    } catch (err) {
      res.status(400).send({message: `${err.message} - Id da editora não localizada.`})
    }
  }

  static excluirEditora = async (req, res) => {
    try {
      const id = req.params.id;
      
      await editoras.findByIdAndDelete(id);

      res.status(200).send({message: 'Editora removida com sucesso'})
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  }
}

export default EditoraController;