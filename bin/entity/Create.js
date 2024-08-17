export const CreateUser = (payload) => ({
    username: payload.username,
    email: payload.email,
    password: payload.password,
    // role: payload.role
})

export const CreateProject = (payload) => ({
    name: payload.name,
    description: payload.description,
    start_date: payload.start_date,
    end_date: payload.end_date
})

export const CreateSprint = (payload) => ({
    name: payload.name,
    goal: payload.goal,
    start_date: payload.start_date,
    end_date: payload.end_date
})

export const CreateStory = (payload) => ({
    title: payload.title,
    description: payload.description,
    priority: payload.priority,
    status: payload.status
})

export const CreateTask = (payload) => ({
    title: payload.title,
    description: payload.description,
    status: payload.status,
    assigneeId: payload.assigneeId
})

export const CreateComment = (payload) => ({
    comment: payload.comment,
})