import express from 'express'
import NotesController from './controllers/NotesController'


const routes = express.Router()

const notesController = new NotesController();

routes.post ('/notes', notesController.create)
routes.get('/notes', notesController.index)
routes.get('/notes/:id', notesController.indexId)
routes.delete('/notes/:id', notesController.removeNote)
routes.put('/notes/:id', notesController.updateNote)


export default routes;