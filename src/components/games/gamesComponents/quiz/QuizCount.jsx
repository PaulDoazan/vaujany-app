import React from 'react'

export default function QuizCount({ questionNb }) {
    return (
        <div className="quiz__count">
            {(questionNb % 4) + 1}/4
        </div>
    )
}
