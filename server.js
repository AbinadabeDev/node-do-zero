import { fastify } from "fastify";
import { DatabaseMemory } from './database-memory.js'

const server = fastify();

const database = new DatabaseMemory()

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })

    console.log(database.list())

    return reply.status(201).send()
})

server.get('/videos', () => {
    const videos = database.list()

    console.log(videos)
    
    return  videos
 })

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', () => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send() 
})

server.listen({
    port: process.env.PORT ?? 3333,
})