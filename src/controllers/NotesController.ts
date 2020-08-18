import { Request, Response } from 'express';
import db from '../database/connection';
import crypto from 'crypto'

export default class NotesController {

    //index - listagem 
    //create - criação
    //removeNote - delete

    async removeNote(request: Request, response: Response) {
        const note_ID = request.params.id
        console.log(note_ID)
        return response.status(201).send()
    }

    async indexId(request: Request, response: Response) {
        const notes = await db('notes')
        try {
            const note_ID = request.params.id
            const note = await notes.filter(note => note.id == note_ID)
            return response.json(note)
        } catch (err) {
            console.log(err)
        }

    }


    async index(request: Request, response: Response) {
        const notes = await db('notes')

        return response.json(notes)

    }

    async create(request: Request, response: Response) {
        const crypto = require("crypto")
        const {
            id,
            title,
            text
        } = request.body



        const trx = await db.transaction();

        try {
            const insertNoteID = await trx('notes').insert({
                id: crypto.randomBytes(16).toString("hex"),
                title,
                text
            })

            const note_id = insertNoteID[0]

            await trx.commit()
            return response.status(201).send()

        } catch (err) {
            console.log(err)
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new note'
            })
        }
    }
}