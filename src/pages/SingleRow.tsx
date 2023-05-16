import React from 'react'

const SingleRow = React.forwardRef(({ user }: any, ref: any) => {
    const body = (
        <>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </>
    )

    const content = ref
        ? <tr ref={ref}>{body}</tr>
        : <tr>{body}</tr>

    return content;
})

export default SingleRow;
