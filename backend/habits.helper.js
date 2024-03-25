import path from 'path';
import fs from 'fs/promises';

const habitsPath = path.join(process.cwd(), 'database.json');

export const getHabits = async () => {
    const habitsData = await fs.readFile(habitsPath, 'utf-8');
    const habits = JSON.parse(habitsData);
    return habits.habits;
}

export const getTodayHabits = async () => {
    const habits = await getHabits()
    const today = new Date().toISOString().slice(0, 10);

    return console.log(habits.map((habit) => ({
        ...habit,
        done: habit.daysDone[today] || false,
    })));
}

export const addHabit = async (title) => {
    try {
        const habits = await getHabits();
        const newHabit = {
            id: habits[habits.length -1].id +1,
            title,
            daysDone: {}
        }

        habits.push(newHabit);

        const data = {habits};

        const dataSend = JSON.stringify(data, null, 4)

        await fs.writeFile(habitsPath, dataSend)

        console.log('Habit successfully added\n');
        console.log('Actual content: \n');
        const content = await fs.readFile(habitsPath, 'utf-8');

        console.log(content);
    } catch (e) {
        console.log(e.message)
    }
}

export const updateHabit = async (id, done) => {
    const habits = await getHabits();
    const habitToUpdate = habits.find((habit) => habit.id === id)

    console.log(habitToUpdate)

    if(!habitToUpdate){
        throw new Error('No habit found !')
    }

    const today = new Date().toISOString().slice(0,10);
    habitToUpdate.daysDone[today] = done;
    const data = {habits}

    const dataSend = JSON.stringify(data, null, 4)
    await fs.writeFile(habitsPath, dataSend)
    console.log('Updated successfully');

}

updateHabit(2, true);