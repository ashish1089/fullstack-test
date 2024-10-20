import { useState } from "react";

export default function EmailList({ emails, onEmailClick, favorites, showEmailBody, readEmails }) {
    const [activeElement, setActiveElement] = useState(null);
    return (
        <ul className="flex flex-col max-h-[90vh] gap-6 overflow-auto">
            {
                emails.map((email, index) => (
                    <li key={email.id} id={`${email.id}`}
                        className={`flex gap-2 rounded-lg p-2  text-slate-500 
                            ${showEmailBody && activeElement === index ? 'active bg-white' : ''} 
                            ${readEmails.includes(email.id) ? 'bg-[var(--readBackground)]' : 'bg-white'}
                        `
                        }
                        onClick={(event) => {
                            onEmailClick(email, event)
                            setActiveElement(index)
                        }}
                    >
                        <div className='px-4  pointer-events-none'>
                            <div className='bg-[var(--accent)] text-white rounded-[50%] py-3 px-5 font-bold text-2xl '>{email.from.name.charAt(0).toUpperCase()}</div>
                        </div>
                        <div className="pointer-events-none">
                            <p>From: <span className="font-bold">{email.from.name}&lt;{email.from.email} &gt;</span>
                            </p>
                            <p>Subject: <span className="font-bold">{email.subject}</span></p>
                            <p className="py-2">{email.short_description}</p>
                            <div className='flex gap-12'>{email.date}
                                <div className='text-[var(--accent)] font-bold'>
                                    {favorites.includes(email.id) && 'Favorite'}
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
