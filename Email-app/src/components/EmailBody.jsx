export default function EmailBody({ email, toggleFavorite, favorites }) {
    return (
        <div className=" bg-white email-body border-2 border-[var(--border)] rounded-lg pl-4 pr-20 py-4 max-w-[65vw] min-h-[90vh] overflow-auto">
            <section className="flex items-center justify-between
                    gap-12">
                <div className="flex gap-4">
                    <div className='p-4'>
                        <div className='bg-[var(--accent)] text-white rounded-[50%] py-3 px-5 font-bold text-2xl '>
                            {email.name[0].toUpperCase()}</div>
                    </div>
                    <div>
                        <h1 className="text-3xl mb-4 mt-6">{email.subject}</h1>
                    </div>
                </div>
                <button className={`${favorites.includes(email.id) ? 'bg-gray-600' : 'bg-[var(--accent)]'} text-white font-bold rounded-full px-4 py-2 favoriteBtn`}
                    onClick={() => toggleFavorite(email.id)}
                >
                    {!favorites.includes(email.id) ? 'Mark as favorite' : 'Unmark as favorite'}
                </button>
            </section>

            <section className="pl-24">
                <p>{email.date}</p>
            </section>

            <section className="pl-24 pr-12 py-8 email-content" dangerouslySetInnerHTML={{ __html: email.body }} />
        </div>
    )
}
