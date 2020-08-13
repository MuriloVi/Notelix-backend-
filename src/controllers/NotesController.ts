import { Request, Response} from 'express';
import db from '../database/connection';

export default class ClassesContorller{

    //index - listagem 
    //create - criação
    
    async index( request:Request, response: Response){
         const notes = await db('notes')

         return response.json(notes)

    }

    async create (request:Request, response:Response) {
          const {
              title,
              text
          } = request.body

          const trx = await db.transaction();

          try{
              const insertNoteID = await trx('notes').insert({
                  title,
                  text
              })

              const note_id = insertNoteID[0]

              await trx.commit()
              return response.status(201).send()

          }catch(err){
            console.log(err)
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
          }
    }
}