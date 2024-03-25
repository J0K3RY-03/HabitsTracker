import {
    getHabits,
    getTodayHabits,
    addHabit,
    updateHabit,
} from '../habits.helper.js';

export default async function habitsRoute(fastify){
    fastify.get('/', async (request, reply) => {
        try {
            const habits = await getHabits();
            return habits
        } catch (e) {
            return reply.code(400).send(e.message);
        }
    })
}