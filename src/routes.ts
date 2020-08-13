import express from 'express'
import NotesController from './controllers/notesController'


const routes = express.Router()

const notesController = new NotesController();

routes.post ('/notes', notesController.create)
routes.get('/notes', notesController.index)


export default routes;